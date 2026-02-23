---
applyTo: "**"
---

## User Flow

- Three-page application with Next.js App Router:
  - `/` — **Project page**: project-specific settings + live output preview
  - `/preferences` — **Company Preferences page**: reusable conventions saved to localStorage
  - `/prompts` — **Prompts & Tasks page**: reusable prompt file configurations and VS Code tasks saved to localStorage
- All pages share the same two-column layout: **form panel** (left) and **live output preview** (right)
- A shared `<Nav>` component links between all three pages
- Output updates reactively as the user types — no submit button required
- Users can copy any individual output file to the clipboard, or download all files as a `.zip` archive preserving the correct subfolder structure
- Company preferences persist across sessions via `atomWithStorage` (localStorage)
- Project settings are session-only (standard Jotai atoms, reset on refresh)

## Form Sections

### Company Preferences page (`/preferences`)

Reusable conventions likely to be consistent across all projects:

| Section | Key inputs |
|---|---|
| **Folder Structure** | Which top-level `src/` folders are used; whether the feature module pattern applies |
| **Code Conventions** | Import alias, export style (named vs default), component function style |
| **TypeScript** | Strictness level, JSDoc requirements, immutability preference, non-null assertion policy |
| **React Components** | Component pattern (arrow fn), `use client` rule, Tailwind-only rule, max file length |
| **State Management** | Library choice, atom file location, naming convention |
| **Scoped Files** | Checkboxes for which `.instructions.md` files to generate; editable `applyTo` glob per file |

### Project page (`/`)

Project-specific settings that change per project:

| Section | Key inputs |
|---|---|
| **Project Info** | Project name, short description, overview paragraph |
| **Tech Stack** | Framework, language, styling library, state management, testing, runtime |
| **VS Code Settings** | Task-scoped instruction text for: code generation, test generation, code review, commit messages |

### Prompts & Tasks page (`/prompts`)

Reusable prompt files and VS Code task definitions likely to be consistent across all projects:

| Section | Key inputs |
|---|---|
| **Prompt Files** | List of `.github/prompts/*.prompt.md` entries: toggle enabled, edit label, description, agent mode (`agent` \| `ask` \| `edit`), and full body content |
| **VS Code Tasks** | List of `.vscode/tasks.json` task entries: label, shell command, group, and problem matcher |

## Atom Shapes

Atoms are split into two groups in `src/lib/atoms.ts`:

### Company preference atoms — persisted to localStorage via `atomWithStorage`

```ts
import { atomWithStorage } from 'jotai/utils';

// Each section uses atomWithStorage so values survive page refresh
export const folderStructureAtom = atomWithStorage<FolderStructureState>('pref:folderStructure', defaultFolderStructure);
export const codeConventionsAtom = atomWithStorage<CodeConventionsState>('pref:codeConventions', defaultCodeConventions);
export const typeScriptAtom = atomWithStorage<TypeScriptState>('pref:typeScript', defaultTypeScript);
export const reactComponentsAtom = atomWithStorage<ReactComponentsState>('pref:reactComponents', defaultReactComponents);
export const stateManagementAtom = atomWithStorage<StateManagementState>('pref:stateManagement', defaultStateManagement);
export const promptFilesAtom = atomWithStorage<PromptFileConfig[]>('pref:promptFiles', defaultPromptFiles);
export const vsCodeTasksAtom = atomWithStorage<VsCodeTasksState>('pref:vsCodeTasks', defaultVsCodeTasks);
```

Key interfaces for the Prompts & Tasks page:

```ts
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
```

Defaults for `promptFilesAtom` should be derived from the three existing prompt files in `.github/prompts/`: `implement-and-test`, `review`, and `planning`.

Defaults for `vsCodeTasksAtom` should be derived from the existing `.vscode/tasks.json`: `build`, `typecheck`, `test`, and `lint` tasks.

### Project atoms — session only (standard `atom`)

```ts
export const projectInfoAtom = atom<ProjectInfoState>(defaultProjectInfo);
export const techStackAtom = atom<TechStackState>(defaultTechStack);
export const scopedFilesAtom = atom<ScopedFileConfig[]>(defaultScopedFiles);
export const vsCodeSettingsAtom = atom<VsCodeSettingsState>(defaultVsCodeSettings);
```

### Derived output atom

A single derived atom (`outputAtom`) combines both groups for output generation:

```ts
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
  promptFiles: get(promptFilesAtom),
  vsCodeTasks: get(vsCodeTasksAtom),
}));
```

## Output Files Generated

| Output file | Driven by |
|---|---|
| `.github/copilot-instructions.md` | Project Info + Tech Stack + Code Conventions |
| `.github/instructions/<name>.instructions.md` | Each enabled Scoped File entry |
| `.vscode/settings.json` | VS Code Settings section |
| `.github/prompts/<id>.prompt.md` | Each enabled Prompt File entry |
| `.vscode/tasks.json` | VS Code Tasks section |

## Component Hierarchy

```
<RootLayout>
  <JotaiProvider>
    <Nav />                        ← shared navigation between / and /preferences

    <DashboardPage>              ← src/app/page.tsx (default export)
      <FormPanel>                ← left column, scrollable
        <FormSection title="...">  ← reusable section wrapper with heading
          <ProjectInfoForm />
          <TechStackForm />
          <ScopedFilesForm />
          <VsCodeSettingsForm />
        </FormSection>
      </FormPanel>
      <PreviewPanel>             ← right column, reactive output
        <OutputTabs>             ← tab per generated file
          <OutputFilePreview />  ← syntax-highlighted content
          <CopyButton />
        </OutputTabs>
        <DownloadAllButton />
      </PreviewPanel>
    </DashboardPage>

    <PreferencesPage>            ← src/app/preferences/page.tsx (default export)
      <PreferencesPanel>         ← left column, scrollable
        <FormSection title="...">  ← same reusable wrapper
          <FolderStructureForm />
          <CodeConventionsForm />
          <TypeScriptForm />
          <ReactComponentsForm />
          <StateManagementForm />
        </FormSection>
      </PreferencesPanel>
      <PreviewPanel>             ← right column, same component — reads outputAtom
        <OutputTabs />
        <DownloadAllButton />
      </PreviewPanel>
    </PreferencesPage>

    <PromptsPage>                ← src/app/prompts/page.tsx (default export)
      <PromptsPanel>             ← left column, scrollable
        <FormSection title="...">  ← same reusable wrapper
          <PromptFilesForm />     ← per-prompt: toggle enabled, agent mode, description, editable body
          <VsCodeTasksForm />     ← editable list of tasks with label, command, group, problemMatcher
        </FormSection>
      </PromptsPanel>
      <PreviewPanel>             ← right column, same component — reads outputAtom
        <OutputTabs />
        <DownloadAllButton />
      </PreviewPanel>
    </PromptsPage>
  </JotaiProvider>
</RootLayout>
```

## Key Implementation Notes

- `src/lib/generateContext.ts` contains pure functions that transform atom state → markdown strings; one function per output file
- Company preference atoms use `atomWithStorage` from `jotai/utils` with a `pref:` key prefix to avoid localStorage collisions
- Project atoms use standard `atom` — they reset on page refresh by design
- `promptFilesAtom` and `vsCodeTasksAtom` use `atomWithStorage` — they persist like company preferences
- `generatePromptFile(config: PromptFileConfig)` in `src/lib/generateContext.ts` renders the YAML frontmatter (`agent:`, `description:`) followed by the body content
- `generateVsCodeTasks(state: VsCodeTasksState)` in `src/lib/generateContext.ts` renders the `.vscode/tasks.json` file
- `<PreviewPanel>` is shared between all three pages — it reads `outputAtom` which combines both groups
- `<OutputFilePreview>` renders content in a `<pre>` block; no third-party syntax highlighting library unless explicitly added
- Download produces a `.zip` archive containing all generated files in their correct folder structure (e.g. `.github/instructions/`, `.vscode/`) — use the `fflate` library (`npm install fflate`) for zip generation; `<DownloadAllButton>` triggers this via a client-side Blob + `<a download>` link
- All form inputs are controlled via Jotai atoms — no local `useState` for form values
- `<Nav>` lives in `src/components/Nav.tsx` as it is shared across all pages
