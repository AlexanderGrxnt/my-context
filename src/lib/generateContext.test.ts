import {
  generateCopilotInstructions,
  generateScopedInstructionFile,
  generateVsCodeSettings,
  generatePromptFile,
  generateVsCodeTasks,
  generateAllFiles,
} from '@/lib/generateContext';
import type { OutputState } from '@/lib/generateContext';
import type { ScopedFileConfig, VsCodeSettingsState, PromptFileConfig, VsCodeTasksState } from '@/lib/atoms';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const emptyScopedFiles: ScopedFileConfig[] = [];

const enabledPromptFile: PromptFileConfig = {
  id: 'review',
  label: 'Review',
  description: 'Review selected code against project conventions',
  agent: 'ask',
  enabled: true,
  content: 'Review the code.',
};

const disabledPromptFile: PromptFileConfig = {
  ...enabledPromptFile,
  enabled: false,
};

const sampleVsCodeTasks: VsCodeTasksState = {
  tasks: [
    { label: 'build', command: 'npm run build', group: 'build', problemMatcher: ['$tsc'] },
  ],
};

const enabledScopedFile: ScopedFileConfig = {
  id: 'components',
  label: 'React Components',
  enabled: true,
  applyTo: '**/*.tsx',
};

const disabledScopedFile: ScopedFileConfig = {
  id: 'components',
  label: 'React Components',
  enabled: false,
  applyTo: '**/*.tsx',
};

const emptyVsCodeSettings: VsCodeSettingsState = {
  codeGeneration: '',
  testGeneration: '',
  codeReview: '',
  commitMessages: '',
};

const baseState: OutputState = {
  projectInfo: { name: 'my-app', description: 'A test app', overview: '', workingWithCodebase: '', bootstrapSteps: '' },
  techStack: {
    framework: 'Next.js 15',
    language: 'TypeScript',
    styling: 'Tailwind CSS',
    stateManagement: 'Jotai',
    testing: 'Jest',
    runtime: 'Node.js',
    testingNotes: '',
  },
  folderStructure: { folders: ['app', 'components'], useFeatureModules: true, features: [] },
  codeConventions: { importAlias: '@/*', exportStyle: 'named', componentStyle: 'arrow' },
  typeScript: { strictness: 'strict', requireJsDoc: true, preferImmutability: true, allowNonNullAssertion: false },
  reactComponents: { componentPattern: 'arrow', requireUseClient: true, tailwindOnly: true, maxFileLength: 150 },
  stateManagement: { library: 'Jotai', atomFileLocation: 'src/lib/atoms.ts', namingConvention: 'camelCase with Atom suffix' },
  scopedFiles: [enabledScopedFile],
  vsCodeSettings: emptyVsCodeSettings,
  architecture: { routes: [], domainTypes: [], componentHierarchy: '' },
  persistence: { strategy: '', tool: '', notes: '' },
  aiIntegration: { provider: '', sdk: '', approach: '', notes: '' },
  environment: { vars: [] },
  promptFiles: [enabledPromptFile],
  vsCodeTasks: sampleVsCodeTasks,
};

// ---------------------------------------------------------------------------
// generateCopilotInstructions
// ---------------------------------------------------------------------------

describe('generateCopilotInstructions', () => {
  it('includes the project name in the heading', () => {
    const result = generateCopilotInstructions(baseState);
    expect(result).toContain('# GitHub Copilot Instructions - my-app');
  });

  it('uses TBD at init for the project name when name is empty', () => {
    const state = { ...baseState, projectInfo: { name: '', description: '', overview: '', workingWithCodebase: '', bootstrapSteps: '' } };
    const result = generateCopilotInstructions(state);
    expect(result).toContain('# GitHub Copilot Instructions - TBD at init');
  });

  it('always includes the Project Overview section — uses TBD at init when both fields are empty', () => {
    const state = {
      ...baseState,
      projectInfo: { name: 'x', description: '', overview: '', workingWithCodebase: '', bootstrapSteps: '' },
    };
    const result = generateCopilotInstructions(state);
    expect(result).toContain('## Project Overview');
    expect(result).toContain('TBD at init');
  });

  it('always includes the Bootstrap Sequence section — uses TBD at init when bootstrapSteps is empty', () => {
    const state = {
      ...baseState,
      projectInfo: { ...baseState.projectInfo, bootstrapSteps: '' },
    };
    const result = generateCopilotInstructions(state);
    expect(result).toContain('## Bootstrap Sequence');
    expect(result).toContain('TBD at init');
  });

  it('uses the provided bootstrap steps when set', () => {
    const state = {
      ...baseState,
      projectInfo: { ...baseState.projectInfo, bootstrapSteps: 'npm install\nnpm run dev' },
    };
    const result = generateCopilotInstructions(state);
    expect(result).toContain('npm install');
    expect(result).not.toContain('TBD at init');
  });

  it('uses overview when both overview and description are provided', () => {
    const state = {
      ...baseState,
      projectInfo: { name: 'x', description: 'short desc', overview: 'full overview text', workingWithCodebase: '', bootstrapSteps: '' },
    };
    const result = generateCopilotInstructions(state);
    expect(result).toContain('full overview text');
    expect(result).not.toContain('short desc');
  });

  it('falls back to description when overview is empty', () => {
    const state = {
      ...baseState,
      projectInfo: { name: 'x', description: 'short desc', overview: '', workingWithCodebase: '', bootstrapSteps: '' },
    };
    const result = generateCopilotInstructions(state);
    expect(result).toContain('short desc');
  });

  it('uses TBD at init for overview when both overview and description are empty', () => {
    const state = {
      ...baseState,
      projectInfo: { name: 'x', description: '', overview: '', workingWithCodebase: '', bootstrapSteps: '' },
    };
    const result = generateCopilotInstructions(state);
    expect(result).toContain('## Project Overview');
    expect(result).toContain('TBD at init');
  });

  it('renders tech stack entries as a bullet list', () => {
    const result = generateCopilotInstructions(baseState);
    expect(result).toContain('- **Framework:** Next.js 15');
    expect(result).toContain('- **Language:** TypeScript');
  });

  it('omits a tech stack entry when its value is empty', () => {
    const state = {
      ...baseState,
      techStack: { ...baseState.techStack, styling: '' },
    };
    const result = generateCopilotInstructions(state);
    expect(result).not.toContain('**Styling:**');
  });

  it('omits the Tech Stack section when all values are empty', () => {
    const state = {
      ...baseState,
      techStack: { framework: '', language: '', styling: '', stateManagement: '', testing: '', runtime: '', testingNotes: '' },
    };
    const result = generateCopilotInstructions(state);
    expect(result).not.toContain('## Tech Stack');
  });

  it('renders the import alias in Key Conventions', () => {
    const result = generateCopilotInstructions(baseState);
    expect(result).toContain('`@/*` import alias');
  });

  it('appends named export clarification for named export style', () => {
    const result = generateCopilotInstructions(baseState);
    expect(result).toContain('default exports only for Next.js page/layout files');
  });

  it('omits Key Conventions when import alias is empty', () => {
    const state = {
      ...baseState,
      codeConventions: { ...baseState.codeConventions, importAlias: '' },
    };
    const result = generateCopilotInstructions(state);
    expect(result).not.toContain('## Key Conventions');
  });

  it('includes Working with This Codebase section when workingWithCodebase is set', () => {
    const state = { ...baseState, projectInfo: { ...baseState.projectInfo, workingWithCodebase: 'Read the docs first.' } };
    const result = generateCopilotInstructions(state);
    expect(result).toContain('## Working with This Codebase');
    expect(result).toContain('Read the docs first.');
  });

  it('omits Working with This Codebase when workingWithCodebase is empty', () => {
    const state = { ...baseState, projectInfo: { ...baseState.projectInfo, workingWithCodebase: '' } };
    const result = generateCopilotInstructions(state);
    expect(result).not.toContain('## Working with This Codebase');
  });

  it('renders the scoped instructions table for enabled files', () => {
    const result = generateCopilotInstructions(baseState);
    expect(result).toContain('## Scoped Instructions');
    expect(result).toContain('.github/instructions/components.instructions.md');
    expect(result).toContain('React Components');
  });

  it('omits the scoped instructions table when no files are enabled', () => {
    const state = { ...baseState, scopedFiles: emptyScopedFiles };
    const result = generateCopilotInstructions(state);
    expect(result).not.toContain('## Scoped Instructions');
  });

  it('excludes disabled scoped files from the table', () => {
    const state = { ...baseState, scopedFiles: [disabledScopedFile] };
    const result = generateCopilotInstructions(state);
    expect(result).not.toContain('## Scoped Instructions');
  });

  it('does not end with trailing whitespace or newlines', () => {
    const result = generateCopilotInstructions(baseState);
    expect(result).toBe(result.trimEnd());
  });
});

// ---------------------------------------------------------------------------
// generateScopedInstructionFile
// ---------------------------------------------------------------------------

describe('generateScopedInstructionFile', () => {
  const makeFile = (id: ScopedFileConfig['id'], applyTo: string): ScopedFileConfig => ({
    id,
    label: id,
    enabled: true,
    applyTo,
  });

  it('renders YAML frontmatter with the applyTo glob', () => {
    const result = generateScopedInstructionFile(makeFile('components', '**/*.tsx'), baseState);
    expect(result).toContain('---\napplyTo: "**/*.tsx"\n---');
  });

  it('generates React Component Rules for id=components', () => {
    const result = generateScopedInstructionFile(makeFile('components', '**/*.tsx'), baseState);
    expect(result).toContain('## React Component Rules');
    expect(result).toContain('arrow-function');
  });

  it('includes the Tailwind CSS section when tailwindOnly is true', () => {
    const result = generateScopedInstructionFile(makeFile('components', '**/*.tsx'), baseState);
    expect(result).toContain('## Tailwind CSS');
  });

  it('omits the Tailwind CSS section when tailwindOnly is false', () => {
    const state = { ...baseState, reactComponents: { ...baseState.reactComponents, tailwindOnly: false } };
    const result = generateScopedInstructionFile(makeFile('components', '**/*.tsx'), state);
    expect(result).not.toContain('## Tailwind CSS');
  });

  it('generates Folder Structure section for id=structure', () => {
    const result = generateScopedInstructionFile(makeFile('structure', '**'), baseState);
    expect(result).toContain('## Folder Structure Conventions');
    expect(result).toContain('+-- app');
    expect(result).toContain('+-- components');
  });

  it('includes Feature Module Structure when useFeatureModules is true', () => {
    const state = { ...baseState, folderStructure: { folders: ['app', 'features'], useFeatureModules: true, features: [] } };
    const result = generateScopedInstructionFile(makeFile('structure', '**'), state);
    expect(result).toContain('## Feature Module Structure');
    expect(result).toContain('+-- index.ts');
  });

  it('omits Feature Module Structure when useFeatureModules is false', () => {
    const state = { ...baseState, folderStructure: { folders: ['app'], useFeatureModules: false, features: [] } };
    const result = generateScopedInstructionFile(makeFile('structure', '**'), state);
    expect(result).not.toContain('## Feature Module Structure');
  });

  it('generates state management rules for id=state', () => {
    const result = generateScopedInstructionFile(makeFile('state', 'src/**'), baseState);
    expect(result).toContain('## Jotai State Management');
    expect(result).toContain('src/lib/atoms.ts');
  });

  it('generates TypeScript rules for id=typescript', () => {
    const result = generateScopedInstructionFile(makeFile('typescript', '**/*.ts, **/*.tsx'), baseState);
    expect(result).toContain('## TypeScript');
    expect(result).toContain('strict');
  });

  it('includes the JSDoc section when requireJsDoc is true', () => {
    const result = generateScopedInstructionFile(makeFile('typescript', '**/*.ts, **/*.tsx'), baseState);
    expect(result).toContain('## JSDoc');
  });

  it('omits the JSDoc section when requireJsDoc is false', () => {
    const state = { ...baseState, typeScript: { ...baseState.typeScript, requireJsDoc: false } };
    const result = generateScopedInstructionFile(makeFile('typescript', '**/*.ts, **/*.tsx'), state);
    expect(result).not.toContain('## JSDoc');
  });

  it('includes the Immutability & Patterns section when preferImmutability is true', () => {
    const result = generateScopedInstructionFile(makeFile('typescript', '**/*.ts, **/*.tsx'), baseState);
    expect(result).toContain('## Immutability & Patterns');
  });

  it('does not end with trailing whitespace', () => {
    const result = generateScopedInstructionFile(makeFile('components', '**/*.tsx'), baseState);
    expect(result).toBe(result.trimEnd());
  });

  describe('design id', () => {
    const designFile = makeFile('design', '**');
    const emptyArchitecture = { routes: [], domainTypes: [], componentHierarchy: '' };

    it('always includes Route Map with TBD at init when no routes are defined', () => {
      const state = { ...baseState, architecture: emptyArchitecture };
      const result = generateScopedInstructionFile(designFile, state);
      expect(result).toContain('## Route Map');
      expect(result).toContain('TBD at init');
    });

    it('always includes Domain Types with TBD at init when no types are defined', () => {
      const state = { ...baseState, architecture: emptyArchitecture };
      const result = generateScopedInstructionFile(designFile, state);
      expect(result).toContain('## Domain Types');
      expect(result).toContain('TBD at init');
    });

    it('always includes Component Hierarchy with TBD at init when blank', () => {
      const state = { ...baseState, architecture: emptyArchitecture };
      const result = generateScopedInstructionFile(designFile, state);
      expect(result).toContain('## Component Hierarchy');
      expect(result).toContain('TBD at init');
    });

    it('renders defined routes in a table and no TBD at init when all fields are populated', () => {
      const state = {
        ...baseState,
        architecture: {
          routes: [{ path: '/recipes', description: 'Browse recipes' }],
          domainTypes: [{ name: 'Recipe', description: 'A recipe entry' }],
          componentHierarchy: '<App />',
        },
      };
      const result = generateScopedInstructionFile(designFile, state);
      expect(result).toContain('| `/recipes` | Browse recipes |');
      expect(result).not.toContain('TBD at init');
    });

    it('renders defined component hierarchy', () => {
      const state = {
        ...baseState,
        architecture: {
          routes: [{ path: '/', description: 'Home' }],
          domainTypes: [{ name: 'Recipe', description: 'A recipe entry' }],
          componentHierarchy: '<App>\n  <Header />\n</App>',
        },
      };
      const result = generateScopedInstructionFile(designFile, state);
      expect(result).toContain('<App>');
      expect(result).not.toContain('TBD at init');
    });
  });
});

// ---------------------------------------------------------------------------
// generateVsCodeSettings
// ---------------------------------------------------------------------------

describe('generateVsCodeSettings', () => {
  it('returns an empty JSON object when all settings are empty and no scoped files', () => {
    const result = generateVsCodeSettings(emptyVsCodeSettings, emptyScopedFiles);
    expect(JSON.parse(result)).toEqual({});
  });

  it('includes enabled scoped files as file references in codeGeneration instructions', () => {
    const result = generateVsCodeSettings(emptyVsCodeSettings, [enabledScopedFile]);
    const parsed = JSON.parse(result);
    expect(parsed['github.copilot.chat.codeGeneration.instructions']).toContainEqual({
      file: '.github/instructions/components.instructions.md',
    });
  });

  it('excludes disabled scoped files from codeGeneration instructions', () => {
    const result = generateVsCodeSettings(emptyVsCodeSettings, [disabledScopedFile]);
    const parsed = JSON.parse(result);
    expect(parsed['github.copilot.chat.codeGeneration.instructions']).toBeUndefined();
  });

  it('appends a text entry to codeGeneration when codeGeneration setting is non-empty', () => {
    const settings = { ...emptyVsCodeSettings, codeGeneration: 'Use named exports.' };
    const result = generateVsCodeSettings(settings, [enabledScopedFile]);
    const parsed = JSON.parse(result);
    const entries = parsed['github.copilot.chat.codeGeneration.instructions'];
    expect(entries).toContainEqual({ text: 'Use named exports.' });
  });

  it('renders testGeneration instructions when set', () => {
    const settings = { ...emptyVsCodeSettings, testGeneration: 'Use Jest.' };
    const result = generateVsCodeSettings(settings, emptyScopedFiles);
    const parsed = JSON.parse(result);
    expect(parsed['github.copilot.chat.testGeneration.instructions']).toEqual([
      { text: 'Use Jest.' },
    ]);
  });

  it('renders codeReview instructions when set', () => {
    const settings = { ...emptyVsCodeSettings, codeReview: 'Flag any.' };
    const result = generateVsCodeSettings(settings, emptyScopedFiles);
    const parsed = JSON.parse(result);
    expect(parsed['github.copilot.chat.reviewSelection.instructions']).toEqual([
      { text: 'Flag any.' },
    ]);
  });

  it('renders commitMessages instructions when set', () => {
    const settings = { ...emptyVsCodeSettings, commitMessages: 'Use conventional commits.' };
    const result = generateVsCodeSettings(settings, emptyScopedFiles);
    const parsed = JSON.parse(result);
    expect(parsed['github.copilot.chat.commitMessageGeneration.instructions']).toEqual([
      { text: 'Use conventional commits.' },
    ]);
  });

  it('trims whitespace from setting values', () => {
    const settings = { ...emptyVsCodeSettings, codeReview: '  Flag any.  ' };
    const result = generateVsCodeSettings(settings, emptyScopedFiles);
    const parsed = JSON.parse(result);
    expect(parsed['github.copilot.chat.reviewSelection.instructions'][0].text).toBe('Flag any.');
  });

  it('returns valid JSON', () => {
    const settings = { ...emptyVsCodeSettings, codeGeneration: 'Always use named exports.' };
    const result = generateVsCodeSettings(settings, [enabledScopedFile]);
    expect(() => JSON.parse(result)).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// generatePromptFile
// ---------------------------------------------------------------------------

describe('generatePromptFile', () => {
  it('renders the YAML frontmatter with agent and description', () => {
    const result = generatePromptFile(enabledPromptFile);
    expect(result).toContain('---\nagent: ask\ndescription: Review selected code against project conventions\n---');
  });

  it('includes the body content after the frontmatter', () => {
    const result = generatePromptFile(enabledPromptFile);
    expect(result).toContain('Review the code.');
  });

  it('trims leading and trailing whitespace from the body', () => {
    const config: PromptFileConfig = { ...enabledPromptFile, content: '  trimmed  ' };
    const result = generatePromptFile(config);
    expect(result.endsWith('trimmed')).toBe(true);
  });

  it('renders agent: agent correctly', () => {
    const config: PromptFileConfig = { ...enabledPromptFile, agent: 'agent' };
    const result = generatePromptFile(config);
    expect(result).toContain('agent: agent');
  });
});

// ---------------------------------------------------------------------------
// generateVsCodeTasks
// ---------------------------------------------------------------------------

describe('generateVsCodeTasks', () => {
  it('renders valid JSON with version 2.0.0', () => {
    const result = generateVsCodeTasks(sampleVsCodeTasks);
    const parsed = JSON.parse(result);
    expect(parsed.version).toBe('2.0.0');
  });

  it('includes the task label and command', () => {
    const result = generateVsCodeTasks(sampleVsCodeTasks);
    const parsed = JSON.parse(result);
    expect(parsed.tasks[0].label).toBe('build');
    expect(parsed.tasks[0].command).toBe('npm run build');
  });

  it('includes the problem matcher array', () => {
    const result = generateVsCodeTasks(sampleVsCodeTasks);
    const parsed = JSON.parse(result);
    expect(parsed.tasks[0].problemMatcher).toEqual(['$tsc']);
  });

  it('sets type to shell for all tasks', () => {
    const result = generateVsCodeTasks(sampleVsCodeTasks);
    const parsed = JSON.parse(result);
    expect(parsed.tasks[0].type).toBe('shell');
  });

  it('filters out tasks with empty label or command', () => {
    const state: VsCodeTasksState = {
      tasks: [
        { label: '', command: 'npm run build', group: 'build', problemMatcher: [] },
        { label: 'build', command: '', group: 'build', problemMatcher: [] },
        { label: 'test', command: 'npm test', group: 'test', problemMatcher: [] },
      ],
    };
    const result = generateVsCodeTasks(state);
    const parsed = JSON.parse(result);
    expect(parsed.tasks).toHaveLength(1);
    expect(parsed.tasks[0].label).toBe('test');
  });

  it('returns valid JSON', () => {
    expect(() => JSON.parse(generateVsCodeTasks(sampleVsCodeTasks))).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// generateAllFiles
// ---------------------------------------------------------------------------

describe('generateAllFiles', () => {
  it('always includes copilot-instructions.md as the first file', () => {
    const result = generateAllFiles(baseState);
    expect(result[0].path).toBe('.github/copilot-instructions.md');
  });

  it('includes a scoped instructions file for each enabled scoped file', () => {
    const result = generateAllFiles(baseState);
    const paths = result.map((f) => f.path);
    expect(paths).toContain('.github/instructions/components.instructions.md');
  });

  it('excludes scoped instruction files for disabled entries', () => {
    const state = { ...baseState, scopedFiles: [disabledScopedFile] };
    const result = generateAllFiles(state);
    const paths = result.map((f) => f.path);
    expect(paths).not.toContain('.github/instructions/components.instructions.md');
  });

  it('includes settings.json when VS Code settings are non-empty', () => {
    const state = {
      ...baseState,
      vsCodeSettings: { ...emptyVsCodeSettings, codeReview: 'Flag any.' },
    };
    const result = generateAllFiles(state);
    const paths = result.map((f) => f.path);
    expect(paths).toContain('.vscode/settings.json');
  });

  it('includes settings.json when scoped files are enabled (generates codeGen instructions)', () => {
    const result = generateAllFiles(baseState);
    const paths = result.map((f) => f.path);
    expect(paths).toContain('.vscode/settings.json');
  });

  it('omits settings.json when all settings are empty and no scoped files are enabled', () => {
    const state = {
      ...baseState,
      scopedFiles: emptyScopedFiles,
      vsCodeSettings: emptyVsCodeSettings,
    };
    const result = generateAllFiles(state);
    const paths = result.map((f) => f.path);
    expect(paths).not.toContain('.vscode/settings.json');
  });

  it('returns no duplicate file paths', () => {
    const result = generateAllFiles(baseState);
    const paths = result.map((f) => f.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('includes a prompt file for each enabled prompt file entry', () => {
    const result = generateAllFiles(baseState);
    const paths = result.map((f) => f.path);
    expect(paths).toContain('.github/prompts/review.prompt.md');
  });

  it('excludes prompt files for disabled entries', () => {
    const state = { ...baseState, promptFiles: [disabledPromptFile] };
    const result = generateAllFiles(state);
    const paths = result.map((f) => f.path);
    expect(paths).not.toContain('.github/prompts/review.prompt.md');
  });

  it('includes tasks.json when tasks are present', () => {
    const result = generateAllFiles(baseState);
    const paths = result.map((f) => f.path);
    expect(paths).toContain('.vscode/tasks.json');
  });

  it('omits tasks.json when all tasks have empty label or command', () => {
    const state = {
      ...baseState,
      vsCodeTasks: { tasks: [{ label: '', command: '', group: 'build', problemMatcher: [] }] },
    };
    const result = generateAllFiles(state);
    const paths = result.map((f) => f.path);
    expect(paths).not.toContain('.vscode/tasks.json');
  });

  it('returns only copilot-instructions.md when state is fully empty', () => {
    const emptyState: OutputState = {
      projectInfo: { name: '', description: '', overview: '', workingWithCodebase: '', bootstrapSteps: '' },
      techStack: { framework: '', language: '', styling: '', stateManagement: '', testing: '', runtime: '', testingNotes: '' },
      folderStructure: { folders: [], useFeatureModules: false, features: [] },
      codeConventions: { importAlias: '', exportStyle: 'named', componentStyle: 'arrow' },
      typeScript: { strictness: 'strict', requireJsDoc: false, preferImmutability: false, allowNonNullAssertion: false },
      reactComponents: { componentPattern: 'arrow', requireUseClient: false, tailwindOnly: false, maxFileLength: 150 },
      stateManagement: { library: '', atomFileLocation: '', namingConvention: '' },
      scopedFiles: emptyScopedFiles,
      vsCodeSettings: emptyVsCodeSettings,
      architecture: { routes: [], domainTypes: [], componentHierarchy: '' },
      persistence: { strategy: '', tool: '', notes: '' },
      aiIntegration: { provider: '', sdk: '', approach: '', notes: '' },
      environment: { vars: [] },
      promptFiles: [],
      vsCodeTasks: { tasks: [] },
    };
    const result = generateAllFiles(emptyState);
    expect(result).toHaveLength(1);
    expect(result[0].path).toBe('.github/copilot-instructions.md');
  });
});
