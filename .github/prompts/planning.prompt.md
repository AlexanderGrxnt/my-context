---
agent: agent
description: Update instruction files to reflect agreed conventions — no source code changes
---

Analyse the described convention change and update the relevant instruction files in `.github/instructions/`. Do not modify any source code, tests, or configuration files. Ask clarifying questions to the user if the change is not specific enough to determine which instruction file(s) to edit or how to word the new rule. Only update the specific rule(s) that need changing — preserve all unrelated content in the instruction files. If the same rule is referenced in multiple files (e.g. both `components.instructions.md` and `copilot-instructions.md`), update all occurrences for consistency.

## Session Log

Before doing anything else, append a new line to `PROMPT_LOG.md` in the workspace root. Use the format:

```
YYYY-MM-DD HH:MM — [PLANNING] <one-line summary of the planning request>
```

Create the file if it does not exist.

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

If the planning session describes a **new feature** (not just a convention tweak), create a feature branch automatically after updating the instruction files. Use the `run_in_terminal` tool to run:

```bash
git checkout -b feat/<short-description>
```

Derive `<short-description>` from the feature name — lowercase, hyphen-separated, concise (2–4 words). Do not ask the user to do this manually. Confirm the branch name in the output report.

Implementation work should never happen directly on `main`.
