import type {
  ProjectInfoState,
  TechStackState,
  FolderStructureState,
  CodeConventionsState,
  TypeScriptState,
  ReactComponentsState,
  StateManagementState,
  ScopedFileConfig,
  VsCodeSettingsState,
  ArchitectureState,
  PersistenceState,
  AiIntegrationState,
  EnvironmentState,
  PromptFileConfig,
  VsCodeTasksState,
} from '@/lib/atoms';

export interface OutputState {
  projectInfo: ProjectInfoState;
  techStack: TechStackState;
  folderStructure: FolderStructureState;
  codeConventions: CodeConventionsState;
  typeScript: TypeScriptState;
  reactComponents: ReactComponentsState;
  stateManagement: StateManagementState;
  scopedFiles: ScopedFileConfig[];
  vsCodeSettings: VsCodeSettingsState;
  architecture: ArchitectureState;
  persistence: PersistenceState;
  aiIntegration: AiIntegrationState;
  environment: EnvironmentState;
  promptFiles: PromptFileConfig[];
  vsCodeTasks: VsCodeTasksState;
}

export interface GeneratedFile {
  /** Relative path of the output file, e.g. ".github/copilot-instructions.md" */
  path: string;
  /** Full text content of the file */
  content: string;
}

// ---------------------------------------------------------------------------
// copilot-instructions.md
// ---------------------------------------------------------------------------

/**
 * Generates the primary `.github/copilot-instructions.md` file content.
 * @param state - Combined output atom state
 * @returns Markdown string for the main Copilot instructions file
 */
export const generateCopilotInstructions = (state: OutputState): string => {
  const { projectInfo, techStack, codeConventions, scopedFiles, persistence, aiIntegration, environment } = state;

  const techStackLines = Object.entries({
    Framework: techStack.framework,
    Language: techStack.language,
    Styling: techStack.styling,
    'State Management': techStack.stateManagement,
    Testing: techStack.testing,
    Runtime: techStack.runtime,
  })
    .filter(([, value]) => value.trim() !== '')
    .map(([key, value]) => `- **${key}:** ${value}`)
    .join('\n');

  const enabledScopedFiles = scopedFiles.filter((f) => f.enabled);
  const scopedTable =
    enabledScopedFiles.length > 0
      ? [
          '## Scoped Instructions',
          '',
          'Additional rules are applied automatically based on file context:',
          '',
          '| File | Covers |',
          '|---|---|',
          ...enabledScopedFiles.map(
            (f) =>
              `| \`.github/instructions/${f.id}.instructions.md\` | ${f.label} |`
          ),
        ].join('\n')
      : '';

  const projectName = projectInfo.name.trim() || 'TBD at init';

  const sections: string[] = [
    `# GitHub Copilot Instructions - ${projectName}`,
    '',
  ];

  {
    sections.push('## Project Overview', '');
    const overviewText = projectInfo.overview.trim() || projectInfo.description.trim() || 'TBD at init';
    sections.push(overviewText, '');
  }

  if (techStackLines) {
    sections.push('## Tech Stack', '', techStackLines, '');
  }

  if (techStack.testingNotes.trim()) {
    sections.push('## Testing Strategy', '', techStack.testingNotes.trim(), '');
  }

  // Architecture section — persistence and/or AI integration
  const architectureLines: string[] = [];
  if (persistence.strategy.trim()) {
    const parts = [persistence.strategy.trim()];
    if (persistence.tool.trim()) parts.push(`via ${persistence.tool.trim()}`);
    architectureLines.push(`- **Persistence:** ${parts.join(' ')}`);
    if (persistence.notes.trim()) {
      architectureLines.push(`  - ${persistence.notes.trim()}`);
    }
  }
  if (aiIntegration.provider.trim()) {
    const parts = [aiIntegration.provider.trim()];
    if (aiIntegration.sdk.trim()) parts.push(`SDK: \`${aiIntegration.sdk.trim()}\``);
    if (aiIntegration.approach.trim()) parts.push(`via ${aiIntegration.approach.trim()}`);
    architectureLines.push(`- **AI Integration:** ${parts.join(', ')}`);
    if (aiIntegration.notes.trim()) {
      architectureLines.push(`  - ${aiIntegration.notes.trim()}`);
    }
  }
  if (architectureLines.length > 0) {
    sections.push('## Architecture', '', ...architectureLines, '');
  }

  if (codeConventions.importAlias) {
    sections.push(
      '## Key Conventions',
      '',
      `- Use \`${codeConventions.importAlias}\` import alias`,
      `- Prefer ${codeConventions.exportStyle} exports${
        codeConventions.exportStyle === 'named'
          ? '; default exports only for Next.js page/layout files'
          : ''
      }`,
      ''
    );
  }

  const activeEnvVars = environment.vars.filter((v) => v.name.trim());
  if (activeEnvVars.length > 0) {
    const varLines = activeEnvVars.map(
      (v) => `- \`${v.name.trim()}\`${v.description.trim() ? ` — ${v.description.trim()}` : ''}`
    );
    sections.push('## Environment Variables', '', ...varLines, '');
  }

  {
    const bootstrapText = projectInfo.bootstrapSteps.trim() || 'TBD at init';
    sections.push('## Bootstrap Sequence', '', bootstrapText, '');
  }

  if (projectInfo.workingWithCodebase.trim()) {
    sections.push('## Working with This Codebase', '', projectInfo.workingWithCodebase.trim(), '');
  }

  if (scopedTable) {
    sections.push(scopedTable, '');
  }

  return sections.join('\n').trimEnd();
};

// ---------------------------------------------------------------------------
// Scoped file content generators (one per ScopedFileId)
// ---------------------------------------------------------------------------

/**
 * Generates the content for `design.instructions.md`.
 * Covers route map, domain types, and component hierarchy.
 * @param architecture - Architecture state from the project atom
 * @returns Markdown string for the design instructions file
 */
const generateDesignContent = (architecture: ArchitectureState): string => {
  const sections: string[] = [];

  const activeRoutes = architecture.routes.filter((r) => r.path.trim());
  if (activeRoutes.length > 0) {
    sections.push(
      '## Route Map',
      '',
      '| Route | Description |',
      '|---|---|',
      ...activeRoutes.map((r) => `| \`${r.path.trim()}\` | ${r.description.trim()} |`)
    );
  } else {
    sections.push('## Route Map', '', 'TBD at init');
  }

  const activeDomainTypes = architecture.domainTypes.filter((t) => t.name.trim());
  if (activeDomainTypes.length > 0) {
    sections.push('', '## Domain Types', '');
    activeDomainTypes.forEach((t) => {
      sections.push(`### \`${t.name.trim()}\``, '');
      if (t.description.trim()) {
        sections.push(t.description.trim(), '');
      }
    });
  } else {
    sections.push('', '## Domain Types', '', 'TBD at init');
  }

  const hierarchyText = architecture.componentHierarchy.trim() || 'TBD at init';
  sections.push(
    '',
    '## Component Hierarchy',
    '',
    '```',
    hierarchyText,
    '```'
  );

  return sections.join('\n').trimEnd();
};

const FOLDER_DESCRIPTIONS: Record<string, string> = {
  actions:    'global Next.js server actions',
  app:        'Next.js routing folder',
  assets:     'static files such as images, fonts, etc.',
  components: 'shared components used across the entire application',
  config:     'global configuration and env variables',
  features:   'feature-based modules',
  hooks:      'shared hooks used across the entire application',
  lib:        'libraries preconfigured for the application',
  providers:  'all application providers',
  states:     'global state stores',
  test:       'test utilities and mock server',
  types:      'base types used across the application',
  utils:      'shared utility functions',
};

const FOLDER_ORDER = Object.keys(FOLDER_DESCRIPTIONS);

const generateStructureContent = (folderStructure: FolderStructureState): string => {
  if (folderStructure.folders.length === 0) return '';

  const sorted = [...folderStructure.folders].sort(
    (a, b) => FOLDER_ORDER.indexOf(a) - FOLDER_ORDER.indexOf(b)
  );

  const treeLines = sorted.map((folder) => {
    const desc = FOLDER_DESCRIPTIONS[folder] ?? `${folder} files`;
    const padding = ' '.repeat(Math.max(1, 12 - folder.length));
    return `+-- ${folder}${padding}# ${desc}`;
  });

  const sections: string[] = [
    '## Folder Structure Conventions',
    '',
    'src',
    '|',
    ...treeLines,
  ];

  if (folderStructure.useFeatureModules) {
    sections.push(
      '',
      '## Feature Module Structure',
      '',
      'Each feature under `src/features/<feature-name>/` may contain:',
      '',
      '+-- api         # API request declarations and hooks for the feature',
      '+-- actions     # Next.js server actions',
      '+-- assets      # static files scoped to the feature',
      '+-- components  # components scoped to the feature',
      '+-- hooks       # hooks scoped to the feature',
      '+-- states      # state stores for the feature',
      '+-- types       # TypeScript types for the feature domain',
      '+-- utils       # utility functions for the feature',
      '+-- index.ts    # public API \u2014 export everything consumed outside the feature'
    );

    const namedFeatures = (folderStructure.features ?? []).filter((f) => f.name.trim());
    if (namedFeatures.length > 0) {
      sections.push(
        '',
        '## Named Features',
        '',
        '| Feature folder | Description |',
        '|---|---|',
        ...namedFeatures.map(
          (f) => `| \`src/features/${f.name.trim()}/\` | ${f.description.trim()} |`
        )
      );
    }
  }

  return sections.join('\n').trimEnd();
};

const generateComponentsContent = (
  reactComponents: ReactComponentsState,
  codeConventions: CodeConventionsState
): string => {
  const style = codeConventions.componentStyle === 'arrow' ? 'arrow-function' : 'function declaration';
  const example =
    codeConventions.componentStyle === 'arrow'
      ? 'const Foo = (): React.JSX.Element => {}'
      : 'function Foo(): React.JSX.Element {}';

  const rules: string[] = [
    `- Use ${style} components with explicit return types: \`${example}\``,
  ];

  if (codeConventions.exportStyle === 'named') {
    rules.push('- Named exports only; default exports are reserved for Next.js page and layout files');
  }
  if (reactComponents.requireUseClient) {
    rules.push("- All interactive components must include the `'use client'` directive at the top of the file");
  }
  rules.push(`- Keep components single-responsibility and under ~${reactComponents.maxFileLength} lines where possible`);
  rules.push('- Decompose large components into smaller co-located sub-components rather than growing a single file');

  const sections: string[] = ['## React Component Rules', '', ...rules];

  if (reactComponents.tailwindOnly) {
    sections.push(
      '',
      '## Tailwind CSS',
      '',
      '- Use Tailwind utility classes exclusively \u2014 no inline styles or CSS-in-JS',
      '- Group classes in logical order: layout \u2192 spacing \u2192 colour \u2192 interactive states',
      '- Prefer readable class groupings over compressed single-line strings',
      '- Always handle edge cases (empty arrays, undefined values) gracefully in rendered output'
    );
  }

  return sections.join('\n').trimEnd();
};

const generateStateContent = (stateManagement: StateManagementState): string => {
  if (!stateManagement.library) return '';

  const rules: string[] = [
    `- Use \`${stateManagement.library}\` for all shared state \u2014 never React Context`,
  ];

  if (stateManagement.atomFileLocation) {
    rules.push(
      `- All atoms must be defined in \`${stateManagement.atomFileLocation}\` \u2014 never define atoms inline inside components`
    );
  }
  rules.push('- Prefer `useAtomValue` (read-only) or `useSetAtom` (write-only) over `useAtom` when you only need one capability');
  if (stateManagement.namingConvention) {
    rules.push(`- Atom names should be ${stateManagement.namingConvention}: e.g. \`projectNameAtom\``);
  }
  if (stateManagement.atomFileLocation) {
    rules.push(
      `- Derived/computed values should use \`atom(get => ...)\` selector atoms defined in \`${stateManagement.atomFileLocation}\``
    );
  }

  return [`## ${stateManagement.library} State Management`, '', ...rules].join('\n').trimEnd();
};

const generateTypeScriptContent = (typeScript: TypeScriptState): string => {
  const rules: string[] = [
    `- Always use ${typeScript.strictness} TypeScript types \u2014 avoid \`any\` and \`unknown\` without explicit narrowing`,
    '- Prefer `interface` for object shapes that may be extended; use `type` for unions, intersections, and aliases',
  ];

  if (!typeScript.allowNonNullAssertion) {
    rules.push('- Never use non-null assertion (`!`) \u2014 use optional chaining (`?.`) or explicit guards instead');
  }
  rules.push('- Export types alongside their related functions or components; collect shared/cross-cutting types in `src/types/`');

  const sections: string[] = ['## TypeScript', '', ...rules];

  if (typeScript.requireJsDoc) {
    sections.push(
      '',
      '## JSDoc',
      '',
      '- Add concise JSDoc comments to all exported utility functions and hooks',
      '- Include `@param` and `@returns` tags for non-obvious signatures',
      '- One-line summary is sufficient for simple functions; only expand when behaviour is non-obvious'
    );
  }

  if (typeScript.preferImmutability) {
    sections.push(
      '',
      '## Immutability & Patterns',
      '',
      '- Prefer immutable data patterns \u2014 use spread operators (`...`) instead of mutation',
      '- Prefer functional / declarative patterns over imperative loops (`map`, `filter`, `reduce` over `for`)',
      '- Always handle edge cases (empty arrays, `undefined`, `null`) gracefully'
    );
  }

  return sections.join('\n').trimEnd();
};

// ---------------------------------------------------------------------------
// .instructions.md files
// ---------------------------------------------------------------------------

/**
 * Generates a single scoped instruction file, deriving its content from the
 * relevant company preference atoms based on the file's `id`.
 * @param file - The scoped file configuration
 * @param state - Combined output atom state used to derive the file content
 * @returns Markdown string with YAML frontmatter and generated rule content
 */
export const generateScopedInstructionFile = (
  file: ScopedFileConfig,
  state: OutputState
): string => {
  let content: string;
  switch (file.id) {
    case 'design':
      content = generateDesignContent(state.architecture);
      break;
    case 'structure':
      content = generateStructureContent(state.folderStructure);
      break;
    case 'components':
      content = generateComponentsContent(state.reactComponents, state.codeConventions);
      break;
    case 'state':
      content = generateStateContent(state.stateManagement);
      break;
    case 'typescript':
      content = generateTypeScriptContent(state.typeScript);
      break;
    default:
      content = '';
  }

  return [`---`, `applyTo: "${file.applyTo}"`, `---`, '', content].join('\n').trimEnd();
};

// ---------------------------------------------------------------------------
// .vscode/settings.json
// ---------------------------------------------------------------------------

/**
 * Generates the `.vscode/settings.json` content with task-scoped Copilot instructions.
 * @param settings - VS Code settings state
 * @param scopedFiles - Enabled scoped files to reference in code generation instructions
 * @returns JSON string for settings.json
 */
export const generateVsCodeSettings = (
  settings: VsCodeSettingsState,
  scopedFiles: ScopedFileConfig[]
): string => {
  type InstructionEntry = { text: string } | { file: string };

  const json: Record<string, InstructionEntry[]> = {};

  const codeGenInstructions: InstructionEntry[] = scopedFiles
    .filter((f) => f.enabled)
    .map((f) => ({ file: `.github/instructions/${f.id}.instructions.md` }));

  if (settings.codeGeneration.trim()) {
    codeGenInstructions.push({ text: settings.codeGeneration.trim() });
  }

  if (codeGenInstructions.length > 0) {
    json['github.copilot.chat.codeGeneration.instructions'] = codeGenInstructions;
  }

  if (settings.testGeneration.trim()) {
    json['github.copilot.chat.testGeneration.instructions'] = [
      { text: settings.testGeneration.trim() },
    ];
  }

  if (settings.codeReview.trim()) {
    json['github.copilot.chat.reviewSelection.instructions'] = [
      { text: settings.codeReview.trim() },
    ];
  }

  if (settings.commitMessages.trim()) {
    json['github.copilot.chat.commitMessageGeneration.instructions'] = [
      { text: settings.commitMessages.trim() },
    ];
  }

  return JSON.stringify(json, null, 2);
};

// ---------------------------------------------------------------------------
// .github/prompts/*.prompt.md
// ---------------------------------------------------------------------------

/**
 * Generates a single `.github/prompts/<id>.prompt.md` file content.
 * @param config - The prompt file configuration
 * @returns String with YAML frontmatter and markdown body
 */
export const generatePromptFile = (config: PromptFileConfig): string => {
  return [
    '---',
    `agent: ${config.agent}`,
    `description: ${config.description}`,
    '---',
    '',
    config.content.trim(),
  ].join('\n');
};

// ---------------------------------------------------------------------------
// .vscode/tasks.json
// ---------------------------------------------------------------------------

/**
 * Generates the `.vscode/tasks.json` content from the task entries.
 * @param state - VS Code tasks state
 * @returns JSON string for tasks.json
 */
export const generateVsCodeTasks = (state: VsCodeTasksState): string => {
  const tasks = state.tasks
    .filter((t) => t.label.trim() && t.command.trim())
    .map(({ label, command, group, problemMatcher }) => ({
      label,
      type: 'shell' as const,
      command,
      group: group.trim() || 'none',
      problemMatcher,
    }));

  return JSON.stringify({ version: '2.0.0', tasks }, null, 2);
};

// ---------------------------------------------------------------------------
// All output files
// ---------------------------------------------------------------------------

/**
 * Generates all output files from the combined atom state.
 * @param state - Combined output atom state
 * @returns Array of generated files with path and content
 */
export const generateAllFiles = (state: OutputState): GeneratedFile[] => {
  const files: GeneratedFile[] = [];

  files.push({
    path: '.github/copilot-instructions.md',
    content: generateCopilotInstructions(state),
  });

  state.scopedFiles
    .filter((f) => f.enabled)
    .forEach((f) => {
      files.push({
        path: `.github/instructions/${f.id}.instructions.md`,
        content: generateScopedInstructionFile(f, state),
      });
    });

  const settingsContent = generateVsCodeSettings(
    state.vsCodeSettings,
    state.scopedFiles
  );
  if (settingsContent !== '{}') {
    files.push({
      path: '.vscode/settings.json',
      content: settingsContent,
    });
  }

  state.promptFiles
    .filter((f) => f.enabled)
    .forEach((f) => {
      files.push({
        path: `.github/prompts/${f.id}.prompt.md`,
        content: generatePromptFile(f),
      });
    });

  const activeTasks = state.vsCodeTasks.tasks.filter((t) => t.label.trim() && t.command.trim());
  if (activeTasks.length > 0) {
    files.push({
      path: '.vscode/tasks.json',
      content: generateVsCodeTasks(state.vsCodeTasks),
    });
  }

  return files;
};
