import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

export interface ProjectInfoState {
  name: string;
  description: string;
  overview: string;
  workingWithCodebase: string;
  bootstrapSteps: string;
}

export interface TechStackState {
  framework: string;
  language: string;
  styling: string;
  stateManagement: string;
  testing: string;
  runtime: string;
  testingNotes: string;
}

export interface FeatureEntry {
  /** Feature folder name, e.g. "recipe-library" */
  name: string;
  /** Short description of the feature's purpose */
  description: string;
}

export interface FolderStructureState {
  folders: string[];
  useFeatureModules: boolean;
  features: FeatureEntry[];
}

export interface CodeConventionsState {
  importAlias: string;
  exportStyle: 'named' | 'default';
  componentStyle: 'arrow' | 'function';
}

export interface TypeScriptState {
  strictness: 'strict' | 'moderate' | 'loose';
  requireJsDoc: boolean;
  preferImmutability: boolean;
  allowNonNullAssertion: boolean;
}

export interface ReactComponentsState {
  componentPattern: 'arrow' | 'function';
  requireUseClient: boolean;
  tailwindOnly: boolean;
  maxFileLength: number;
}

export interface StateManagementState {
  library: string;
  atomFileLocation: string;
  namingConvention: string;
}

export interface RouteEntry {
  /** URL path, e.g. "/recipes" */
  path: string;
  /** Short description of the page/route */
  description: string;
}

export interface DomainTypeEntry {
  /** Type name, e.g. "Recipe" */
  name: string;
  /** Description of the type and its role in the domain */
  description: string;
}

export interface ArchitectureState {
  routes: RouteEntry[];
  domainTypes: DomainTypeEntry[];
  componentHierarchy: string;
}

export interface PersistenceState {
  strategy: string;
  tool: string;
  notes: string;
}

export interface AiIntegrationState {
  provider: string;
  sdk: string;
  approach: string;
  notes: string;
}

export interface EnvVarEntry {
  /** Environment variable name, e.g. "OPENAI_API_KEY" */
  name: string;
  /** Description of what this variable is for */
  description: string;
}

export interface EnvironmentState {
  vars: EnvVarEntry[];
}

/** Fixed set of scoped instruction file identifiers. */
export type ScopedFileId = 'design' | 'structure' | 'components' | 'state' | 'typescript';

export interface ScopedFileConfig {
  /** Unique identifier — determines which preference section drives the content. */
  id: ScopedFileId;
  /** Display label, e.g. "React Components" */
  label: string;
  /** Whether this file should be included in the output */
  enabled: boolean;
  /** Glob pattern for the `applyTo` frontmatter field */
  applyTo: string;
}

export interface VsCodeSettingsState {
  codeGeneration: string;
  testGeneration: string;
  codeReview: string;
  commitMessages: string;
}

export interface PromptFileConfig {
  /** Slug used as the file name, e.g. "implement-and-test" */
  id: string;
  /** Display label, e.g. "Implement & Test" */
  label: string;
  /** One-line description for the `description` frontmatter field */
  description: string;
  /** Agent mode for the frontmatter `agent:` field */
  agent: 'agent' | 'ask' | 'edit';
  /** Whether this prompt file should be included in the output */
  enabled: boolean;
  /** Markdown body content — everything after the frontmatter */
  content: string;
}

export interface VsCodeTaskEntry {
  label: string;
  command: string;
  /** Task group, e.g. "build", "test", "none" */
  group: string;
  problemMatcher: string[];
}

export interface VsCodeTasksState {
  tasks: VsCodeTaskEntry[];
}

// ---------------------------------------------------------------------------
// Atoms
// ---------------------------------------------------------------------------

const DEFAULT_WORKING_WITH_CODEBASE = [
  'Before implementing anything, read the architectural reference files:',
  '',
  '- **`design.instructions.md`** — routes, domain types, and component hierarchy.',
  '- **`structure.instructions.md`** — folder and feature module conventions. Read this to understand where new files should go.',
  '',
  'The intent for any given task comes from the chat message. If the codebase already exists, use the workspace directly rather than relying on any file inventory. If starting from scratch, follow the bootstrap sequence in this file.',
].join('\n');

export const defaultProjectInfo: ProjectInfoState = {
  name: '',
  description: '',
  overview: '',
  workingWithCodebase: DEFAULT_WORKING_WITH_CODEBASE,
  bootstrapSteps: '',
};

export const projectInfoAtom = atom<ProjectInfoState>(defaultProjectInfo);

export const defaultTechStack: TechStackState = {
  framework: 'Next.js 15 (App Router)',
  language: 'TypeScript',
  styling: 'Tailwind CSS v4',
  stateManagement: 'Jotai',
  testing: 'Jest + React Testing Library',
  runtime: 'Node.js',
  testingNotes: '',
};

export const techStackAtom = atom<TechStackState>(defaultTechStack);

export const folderStructureAtom = atomWithStorage<FolderStructureState>('pref:folderStructure', {
  folders: ['app', 'components', 'lib', 'providers', 'types', 'utils'],
  useFeatureModules: false,
  features: [],
});

export const codeConventionsAtom = atomWithStorage<CodeConventionsState>('pref:codeConventions', {
  importAlias: '@/*',
  exportStyle: 'named',
  componentStyle: 'arrow',
});

export const typeScriptAtom = atomWithStorage<TypeScriptState>('pref:typeScript', {
  strictness: 'strict',
  requireJsDoc: true,
  preferImmutability: true,
  allowNonNullAssertion: false,
});

export const reactComponentsAtom = atomWithStorage<ReactComponentsState>('pref:reactComponents', {
  componentPattern: 'arrow',
  requireUseClient: true,
  tailwindOnly: true,
  maxFileLength: 150,
});

export const stateManagementAtom = atomWithStorage<StateManagementState>('pref:stateManagement', {
  library: 'Jotai',
  atomFileLocation: 'src/lib/atoms.ts',
  namingConvention: 'camelCase with Atom suffix',
});

export const defaultScopedFiles: ScopedFileConfig[] = [
  { id: 'structure',   label: 'Folder Structure',      enabled: true, applyTo: '**' },
  { id: 'design',      label: 'Architecture & Design', enabled: true, applyTo: '**' },
  { id: 'components',  label: 'React Components',      enabled: true, applyTo: '**/*.tsx' },
  { id: 'state',       label: 'State Management',      enabled: true, applyTo: 'src/**' },
  { id: 'typescript',  label: 'TypeScript',            enabled: true, applyTo: '**/*.ts, **/*.tsx' },
];

export const scopedFilesAtom = atomWithStorage<ScopedFileConfig[]>('pref:scopedFiles:v2', defaultScopedFiles);

export const defaultVsCodeSettings: VsCodeSettingsState = {
  codeGeneration: '',
  testGeneration:
    'Use Jest and React Testing Library. Co-locate test files as *.test.ts or *.test.tsx next to the file under test.',
  codeReview:
    'Flag any use of `any`, non-null assertions, inline styles, or atoms defined outside src/lib/atoms.ts.',
  commitMessages:
    'Use conventional commits format: type(scope): description. Types: feat, fix, chore, refactor, docs, style, test.',
};

export const vsCodeSettingsAtom = atom<VsCodeSettingsState>(defaultVsCodeSettings);

// Project-specific atoms (session-only — reset on page refresh)

export const defaultArchitecture: ArchitectureState = {
  routes: [],
  domainTypes: [],
  componentHierarchy: '',
};

export const architectureAtom = atom<ArchitectureState>(defaultArchitecture);

export const defaultPersistence: PersistenceState = {
  strategy: '',
  tool: '',
  notes: '',
};

export const persistenceAtom = atom<PersistenceState>(defaultPersistence);

export const defaultAiIntegration: AiIntegrationState = {
  provider: '',
  sdk: '',
  approach: '',
  notes: '',
};

export const aiIntegrationAtom = atom<AiIntegrationState>(defaultAiIntegration);

export const defaultEnvironment: EnvironmentState = {
  vars: [],
};

export const environmentAtom = atom<EnvironmentState>(defaultEnvironment);

// ---------------------------------------------------------------------------
// Prompt files & VS Code tasks — persisted to localStorage
// ---------------------------------------------------------------------------

const IMPLEMENT_AND_TEST_BODY = [
  'Implement the requested feature following all project conventions, then complete the verification loop below. Do not consider the task done until every step passes.',
  '',
  '## Session Log',
  '',
  'Before doing anything else, append a new line to `PROMPT_LOG.md` in the workspace root. Use the format:',
  '',
  '```',
  'YYYY-MM-DD HH:MM \u2014 [IMPLEMENT] <one-line summary of the feature being implemented>',
  '```',
  '',
  'Create the file if it does not exist.',
  '',
  '## Implementation Checklist',
  '- Follow the component hierarchy defined in `.github/instructions/design.instructions.md`',
  '- Place atoms in `src/lib/atoms.ts` \u2014 never inline',
  '- Use Tailwind utility classes only \u2014 no inline styles',
  '- Use `@/*` import alias throughout',
  '- Named exports only (default for Next.js page/layout files)',
  '',
  '## Verification Loop',
  '',
  '### Step 1 \u2014 Tests',
  '1. Write co-located tests as `<filename>.test.tsx` / `<filename>.test.ts` next to the source file',
  '2. Cover: happy path, empty/null state, and key edge cases',
  '3. Mock Jotai atoms using a `createStore` from `jotai` \u2014 do not mock module internals',
  '4. Test observable behaviour and rendered output \u2014 not implementation details',
  '5. Run: `npm test -- --testPathPattern=<filename> --watchAll=false`',
  '6. If tests fail, fix the source or test and re-run \u2014 repeat until green',
  '',
  '### Step 2 \u2014 Lint',
  '1. Run: `npm run lint`',
  '2. Fix all reported errors and re-run until clean',
  '',
  '### Step 3 \u2014 Type Check',
  '1. Run: `npx tsc --noEmit`',
  '2. Fix all type errors and re-run until clean',
  '',
  '### Step 4 \u2014 Final Confirmation',
  'Report:',
  '- Files created or modified',
  '- Test results (pass count)',
  '- Lint status',
  '- Type check status',
].join('\n');

const REVIEW_BODY = [
  'Review the selected code against the project conventions and report each violation with file, line, and a suggested fix.',
  '',
  '## Session Log',
  '',
  'Before doing anything else, append a new line to `PROMPT_LOG.md` in the workspace root. Use the format:',
  '',
  '```',
  'YYYY-MM-DD HH:MM \u2014 [REVIEW] <one-line summary of what is being reviewed>',
  '```',
  '',
  'Create the file if it does not exist.',
  '',
  '## TypeScript',
  '- [ ] No use of `any` or `unknown` without explicit narrowing',
  '- [ ] No non-null assertions (`!`) \u2014 use optional chaining or guards instead',
  '- [ ] `interface` used for extendable object shapes; `type` for unions/aliases',
  '- [ ] Exported types live alongside their function/component or in `src/types/`',
  '',
  '## React Components',
  '- [ ] Arrow-function component with explicit return type: `const Foo = (): React.JSX.Element => {}`',
  '- [ ] Named export (default export only for Next.js page/layout files)',
  "- [ ] `'use client'` directive present on all interactive components",
  '- [ ] Component is under ~150 lines; large components are decomposed',
  '- [ ] No inline styles \u2014 Tailwind utility classes only',
  '',
  '## State Management',
  '- [ ] No `useState` for shared state \u2014 Jotai only (`useAtom`, `useAtomValue`, `useSetAtom`)',
  '- [ ] No atoms defined outside `src/lib/atoms.ts`',
  '- [ ] No React Context used for shared state',
  '',
  '## General',
  '- [ ] `@/*` import alias used (not relative `../../`)',
  '- [ ] Edge cases handled (empty arrays, `undefined`, `null`)',
  '- [ ] JSDoc present on all exported utility functions and hooks',
].join('\n');

const PLANNING_BODY = [
  'Analyse the described convention change and update the relevant instruction files in `.github/instructions/`. Do not modify any source code, tests, or configuration files.',
  '',
  '## Session Log',
  '',
  'Before doing anything else, append a new line to `PROMPT_LOG.md` in the workspace root. Use the format:',
  '',
  '```',
  'YYYY-MM-DD HH:MM \u2014 [PLANNING] <one-line summary of the planning request>',
  '```',
  '',
  'Create the file if it does not exist.',
  '',
  '## Scope',
  '',
  'Only the following files may be created or modified:',
  '',
  '- `.github/instructions/design.instructions.md` \u2014 page layout, component hierarchy, atom shapes, form sections',
  '- `.github/instructions/structure.instructions.md` \u2014 folder layout and feature module conventions',
  '- `.github/instructions/components.instructions.md` \u2014 React component rules, Tailwind, `use client`',
  '- `.github/instructions/state.instructions.md` \u2014 Jotai atom and state management rules',
  '- `.github/instructions/typescript.instructions.md` \u2014 TypeScript strictness, JSDoc, immutability',
  '- `.github/copilot-instructions.md` \u2014 only if the change affects the project-level summary',
  '',
  'If a convention does not fit any existing file, create a new `.github/instructions/<topic>.instructions.md` with an appropriate `applyTo` glob.',
  '',
  '## Process',
  '',
  '1. **Identify** which instruction file(s) the change affects',
  '2. **Check** the current wording in those files before editing',
  '3. **Edit** only the specific rule(s) that need updating \u2014 preserve all unrelated content',
  '4. **Verify consistency** \u2014 if the same rule is referenced in multiple files (e.g. both `components.instructions.md` and `copilot-instructions.md`), update all occurrences',
  '',
  '## Output',
  '',
  'When done, report:',
  '- Which files were changed',
  '- A brief summary of what was updated and why',
  '- Any rules that were intentionally left unchanged because they remain accurate',
  '',
  '## Branch Guidance',
  '',
  'If the planning session describes a **new feature** (not just a convention tweak), remind the user to create a feature branch before any implementation begins:',
  '',
  '```bash',
  'git checkout -b feat/<short-description>',
  '```',
  '',
  'Implementation work should never happen directly on `main`.',
].join('\n');

const INIT_BODY = [
  'Scan all `.github/` instruction files and `.github/copilot-instructions.md` in this project for the string `TBD at init`. Use the project overview (in `.github/copilot-instructions.md`) and any already-populated sections as context to infer best guesses for each placeholder.',
  '',
  '## Session Log',
  '',
  'Before doing anything else, append a new line to `PROMPT_LOG.md` in the workspace root. Use the format:',
  '',
  '```',
  'YYYY-MM-DD HH:MM \u2014 [INIT] <one-line summary of the project being initialised>',
  '```',
  '',
  'Create the file if it does not exist.',
  '',
  '## Process',
  '',
  'For each `TBD at init` placeholder found:',
  '',
  '1. Attempt to infer a sensible value from the surrounding context (project name, tech stack, other populated fields in the same or related files)',
  '2. If you cannot infer confidently, ask the user a targeted clarifying question \u2014 do not guess blindly',
  '3. Once you have a value, edit the file in place to replace the placeholder',
  '',
  'Work section by section rather than file by file, so related placeholders are resolved together.',
  '',
  '## Architecture (`design.instructions.md`)',
  '',
  'This file is the most likely to contain multiple `TBD at init` entries. Work with the user to define:',
  '',
  '- **Route map** \u2014 list each URL path and describe what the page does (e.g. `/recipes` \u2014 browse and search saved recipes)',
  '- **Domain types** \u2014 the key TypeScript interfaces that represent the core data model (e.g. `Recipe`, `Ingredient`, `User`)',
  '- **Component hierarchy** \u2014 a high-level tree of the main page-level and shared components, showing how they nest',
  '',
  'Use the tech stack and project overview as a starting point for reasonable defaults, and ask the user to confirm or correct them.',
  '',
  '## Bootstrap Sequence (`copilot-instructions.md`)',
  '',
  'Work with the user to write the ordered list of commands and one-time setup tasks needed to go from a fresh clone to a running development environment. Include things like:',
  '',
  '- Installing dependencies',
  '- Copying or creating `.env` files and setting required values',
  '- Running database migrations or seed scripts',
  '- Starting the dev server',
  '',
  '## Completion',
  '',
  'When all `TBD at init` placeholders have been replaced, report:',
  '',
  '- Which files were updated',
  '- A brief summary of the values that were filled in',
  '- Any sections that were intentionally left as `TBD at init` because no value could be determined yet',
].join('\n');

export const defaultPromptFiles: PromptFileConfig[] = [
  {
    id: 'implement-and-test',
    label: 'Implement & Test',
    description: 'Implement a feature then iterate until tests and lint are green',
    agent: 'agent',
    enabled: true,
    content: IMPLEMENT_AND_TEST_BODY,
  },
  {
    id: 'review',
    label: 'Review',
    description: 'Review selected code against project conventions',
    agent: 'ask',
    enabled: true,
    content: REVIEW_BODY,
  },
  {
    id: 'planning',
    label: 'Planning',
    description: 'Update instruction files to reflect agreed conventions \u2014 no source code changes',
    agent: 'agent',
    enabled: true,
    content: PLANNING_BODY,
  },  {
    id: 'init',
    label: 'Init',
    description: 'Fill out TBD at init placeholders after copying generated files to a new project',
    agent: 'agent',
    enabled: true,
    content: INIT_BODY,
  },];

export const promptFilesAtom = atomWithStorage<PromptFileConfig[]>('pref:promptFiles', defaultPromptFiles);

export const defaultVsCodeTasks: VsCodeTasksState = {
  tasks: [
    { label: 'build',     command: 'npm run build',              group: 'build', problemMatcher: ['$tsc'] },
    { label: 'typecheck', command: 'npx tsc --noEmit',           group: 'build', problemMatcher: ['$tsc'] },
    { label: 'test',      command: 'npm test -- --watchAll=false', group: 'test',  problemMatcher: [] },
    { label: 'lint',      command: 'npm run lint',               group: 'build', problemMatcher: ['$eslint-stylish'] },
  ],
};

export const vsCodeTasksAtom = atomWithStorage<VsCodeTasksState>('pref:vsCodeTasks', defaultVsCodeTasks);

// ---------------------------------------------------------------------------
// Section collapse state — persisted to localStorage
// ---------------------------------------------------------------------------

/** Default expanded state: only Project Info is open; all other sections start collapsed. */
export const defaultSectionExpanded: Record<string, boolean> = {
  'project-info': true,
  'tech-stack': false,
  'architecture': false,
  'persistence': false,
  'ai-integration': false,
  'environment': false,
  'working-with-codebase': false,
  'vscode-settings': false,
  'folder-structure': false,
  'code-conventions': false,
  'typescript': false,
  'react-components': false,
  'state-management': false,
  'scoped-files': false,
  'prompt-files': false,
  'vscode-tasks': false,
};

export const sectionExpandedAtom = atomWithStorage<Record<string, boolean>>(
  'pref:sectionExpanded',
  defaultSectionExpanded,
);

// ---------------------------------------------------------------------------
// Help modal state — session only
// ---------------------------------------------------------------------------

export interface HelpModalContent {
  title: string;
  body: string;
}

/** Set to display the help modal for a section; null when closed. */
export const helpModalAtom = atom<HelpModalContent | null>(null);

// ---------------------------------------------------------------------------
// Derived output atom
// ---------------------------------------------------------------------------

/** Aggregates all section atoms into a single shape for output generation. */
export const outputAtom = atom((get) => ({
  projectInfo: get(projectInfoAtom),
  techStack: get(techStackAtom),
  folderStructure: get(folderStructureAtom),
  codeConventions: get(codeConventionsAtom),
  typeScript: get(typeScriptAtom),
  reactComponents: get(reactComponentsAtom),
  stateManagement: get(stateManagementAtom),
  scopedFiles: get(scopedFilesAtom),
  vsCodeSettings: get(vsCodeSettingsAtom),
  architecture: get(architectureAtom),
  persistence: get(persistenceAtom),
  aiIntegration: get(aiIntegrationAtom),
  environment: get(environmentAtom),
  promptFiles: get(promptFilesAtom),
  vsCodeTasks: get(vsCodeTasksAtom),
}));
