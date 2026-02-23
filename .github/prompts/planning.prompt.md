---
agent: agent
description: Update instruction files to reflect agreed conventions — no source code changes
---

Analyse the described convention change and update the relevant instruction files in `.github/instructions/`. Do not modify any source code, tests, or configuration files.

## Scope

Only the following files may be created or modified:

- `.github/instructions/design.instructions.md` — page layout, component hierarchy, atom shapes, form sections
- `.github/instructions/structure.instructions.md` — folder layout and feature module conventions
- `.github/instructions/components.instructions.md` — React component rules, Tailwind, `use client`
- `.github/instructions/state.instructions.md` — Jotai atom and state management rules
- `.github/instructions/typescript.instructions.md` — TypeScript strictness, JSDoc, immutability
- `.github/copilot-instructions.md` — only if the change affects the project-level summary

If a convention does not fit any existing file, create a new `.github/instructions/<topic>.instructions.md` with an appropriate `applyTo` glob.

## Process

1. **Identify** which instruction file(s) the change affects
2. **Check** the current wording in those files before editing
3. **Edit** only the specific rule(s) that need updating — preserve all unrelated content
4. **Verify consistency** — if the same rule is referenced in multiple files (e.g. both `components.instructions.md` and `copilot-instructions.md`), update all occurrences

## Output

When done, report:
- Which files were changed
- A brief summary of what was updated and why
- Any rules that were intentionally left unchanged because they remain accurate

## Branch Guidance

If the planning session describes a **new feature** (not just a convention tweak), remind the user to create a feature branch before any implementation begins:

```bash
git checkout -b feat/<short-description>
```

Do not create the branch yourself — only prompt the user to do so. Implementation work should never happen directly on `main`.
