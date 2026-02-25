import type { HelpModalContent } from '@/lib/atoms';

/**
 * Help text for each form section, keyed by the section's `sectionId`.
 * Imported by panel components and passed as `helpContent` to `<FormSection>`.
 */
export const HELP_CONTENT: Record<string, HelpModalContent> = {
  'project-info': {
    title: 'Project Info',
    body: 'Enter your project name, a short one-line description, and an overview paragraph. These feed directly into the opening section of `.github/copilot-instructions.md` so Copilot understands what your project is and what it does. Leave fields blank to emit a "TBD at init" placeholder for later.',
  },
  'tech-stack': {
    title: 'Tech Stack',
    body: 'Select your framework, language, styling library, state management solution, testing setup, and runtime. This drives the Tech Stack section in `copilot-instructions.md` and ensures Copilot suggests the right packages and patterns.',
  },
  'vscode-settings': {
    title: 'VS Code Settings',
    body: 'Provide per-task Copilot instruction text for code generation, test generation, code review, and commit messages. These are written to `.vscode/settings.json` as `github.copilot.chat.*` instruction entries.',
  },
  'folder-structure': {
    title: 'Folder Structure',
    body: 'Choose which `src/` subdirectories your project uses and whether you follow the feature module pattern. This generates the `structure.instructions.md` scoped instruction file that applies to all files in the project.',
  },
  'code-conventions': {
    title: 'Code Conventions',
    body: 'Set your import alias (e.g. `@/*`), export style (named vs default), and component function style. These feed into `copilot-instructions.md` under the Key Conventions section.',
  },
  'typescript': {
    title: 'TypeScript',
    body: 'Configure TypeScript strictness, JSDoc requirements, and immutability preference. These rules are written to `typescript.instructions.md` and applied to all `.ts` and `.tsx` files.',
  },
  'react-components': {
    title: 'React Components',
    body: 'Set component patterns such as arrow-function style, `use client` usage rules, Tailwind-only enforcement, and maximum file length. These are written to `components.instructions.md` and applied to all `.tsx` files.',
  },
  'state-management': {
    title: 'State Management',
    body: 'Pick your state management library, specify where atom files live, and define the naming convention. This section feeds into `state.instructions.md` and ensures Copilot places state in the right location.',
  },
  'scoped-files': {
    title: 'Scoped Instruction Files',
    body: 'Toggle which `.github/instructions/*.instructions.md` files are included in the output, and edit the `applyTo` glob for each. Scoped instruction files let you apply different rules to different file types automatically.',
  },
  'prompt-files': {
    title: 'Prompt Files',
    body: 'Each entry generates a `.github/prompts/*.prompt.md` file. Toggle prompts on or off, choose the agent mode (`agent`, `ask`, or `edit`), edit the description, and customise the body content that Copilot receives when you invoke the prompt.',
  },
  'vscode-tasks': {
    title: 'VS Code Tasks',
    body: 'Add, edit, or remove task entries that will be written to `.vscode/tasks.json`. Each task has a label, shell command, group (build / test / none), and an optional problem matcher so VS Code can parse errors in the Terminal panel.',
  },
  'architecture': {
    title: 'Architecture',
    body: 'Document your route map, key domain types, and top-level component hierarchy. This content appears in `design.instructions.md` so Copilot understands how the pages and data model fit together.',
  },
  'persistence': {
    title: 'Persistence',
    body: 'Describe your data persistence strategy, the tool used (e.g. Prisma, Drizzle, localStorage), and any relevant notes. This helps Copilot suggest consistent patterns when writing data-access code.',
  },
  'ai-integration': {
    title: 'AI Integration',
    body: 'If your project calls an AI provider, record the provider, SDK, and integration approach here. Copilot will use this to stay consistent with the patterns you have already chosen.',
  },
  'environment': {
    title: 'Environment Variables',
    body: 'List the environment variables your project requires, with a short description for each. These are documented in `copilot-instructions.md` so Copilot knows which env vars are available and what they are for.',
  },
  'working-with-codebase': {
    title: 'Working with This Codebase',
    body: 'Describe how to get started with the codebase — which reference files to read first, the bootstrap sequence, and any one-time setup steps. This section appears in `copilot-instructions.md` and is especially useful when running the `/init` prompt on a new project.',
  },
};
