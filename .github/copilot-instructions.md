# GitHub Copilot Instructions - my-context

## Project Overview

my-context is a Next.js web application providing a visual dashboard for generating
a complete set of GitHub Copilot instruction files. It has three pages:

- **Company Preferences** (`/preferences`) — reusable conventions stored in localStorage:
  folder structure, naming conventions, coding style, TypeScript rules, React component
  rules, and state management preferences. Set once, reused across all projects.
- **Project** (`/`) — project-specific settings: name, description, tech stack, scoped
  instruction file configuration, and VS Code task instructions.
- **Prompts & Tasks** (`/prompts`) — reusable prompt file configurations and VS Code task
  definitions stored in localStorage. Set once, reused across all projects.

Both pages contribute to the output. The app produces a ready-to-use suite of files:

- `.github/copilot-instructions.md` — the primary always-on context file
- `.github/instructions/*.instructions.md` — scoped instruction files with `applyTo` globs
  (e.g. component rules, TypeScript rules, state management rules, folder structure)
- `.vscode/settings.json` — task-scoped instructions for code generation, test generation,
  code review, and commit message generation
- `.vscode/tasks.json` — VS Code task definitions (build, typecheck, test, lint, etc.)
- `.github/prompts/*.prompt.md` — reusable agent prompts for implementing features
  (`/implement-and-test`), reviewing code (`/review`), planning convention changes (`/planning`),
  and initialising a new project (`/init`)

## Tech Stack

- **Framework:** Next.js 15 (App Router, src/ directory)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **State Management:** Jotai
- **Runtime:** Node.js
- **Testing:** Jest + React Testing Library

## Key Conventions

- Use `@/*` import alias (resolves to `src/`)
- Prefer named exports; default exports only for Next.js page/layout files

## Working with This Codebase

Before implementing anything, read the architectural reference files:

- **`design.instructions.md`** — stable architecture documentation: page layout, component hierarchy, atom shapes, form sections. Read this to understand how the app is structured, not as a to-do list.
- **`structure.instructions.md`** — folder and feature module conventions. Read this to understand where new files should go.

The intent for any given task comes from the chat message. The current state of the codebase is the source of truth for what exists. Use the workspace directly rather than relying on any file inventory.

## Scoped Instructions

Additional rules are applied automatically based on file context:

| File | Covers |
|---|---|
| `.github/instructions/design.instructions.md` | User flow, form sections, atom shapes, component hierarchy |
| `.github/instructions/structure.instructions.md` | Folder layout and feature module conventions |
| `.github/instructions/components.instructions.md` | React component rules, Tailwind, `use client` |
| `.github/instructions/state.instructions.md` | Jotai atoms and state management rules |
| `.github/instructions/typescript.instructions.md` | TypeScript strictness, JSDoc, immutability |
- When writing Tailwind, prefer readable class groupings (layout, spacing, colour, interactive)
- Always handle edge cases (empty arrays, undefined values) gracefully

## Session Logging

At the start of each agent conversation, append a new line to `PROMPT_LOG.md` in the workspace root. Use the format:

```
YYYY-MM-DD HH:MM — <one-line summary of the user's first request>
```

Create the file if it does not exist. Do this before any other work.
