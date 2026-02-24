---
agent: agent
description: Fill out TBD at init placeholders after copying generated files to a new project
---

Scan all `.github/` instruction files and `.github/copilot-instructions.md` in this project for the string `TBD at init`. Use the project overview (in `.github/copilot-instructions.md`) and any already-populated sections as context to infer best guesses for each placeholder.

## Session Log

Before doing anything else, append a new line to `PROMPT_LOG.md` in the workspace root. Use the format:

```
YYYY-MM-DD HH:MM — [INIT] <one-line summary of the project being initialised>
```

Create the file if it does not exist.

## Process

For each `TBD at init` placeholder found:

1. Attempt to infer a sensible value from the surrounding context (project name, tech stack, other populated fields in the same or related files)
2. If you cannot infer confidently, ask the user a targeted clarifying question — do not guess blindly
3. Once you have a value, edit the file in place to replace the placeholder

Work section by section rather than file by file, so related placeholders are resolved together.

## Architecture (`design.instructions.md`)

This file is the most likely to contain multiple `TBD at init` entries. Work with the user to define:

- **Route map** — list each URL path and describe what the page does (e.g. `/recipes` — browse and search saved recipes)
- **Domain types** — the key TypeScript interfaces that represent the core data model (e.g. `Recipe`, `Ingredient`, `User`)
- **Component hierarchy** — a high-level tree of the main page-level and shared components, showing how they nest

Use the tech stack and project overview as a starting point for reasonable defaults, and ask the user to confirm or correct them.

## Bootstrap Sequence (`copilot-instructions.md`)

Work with the user to write the ordered list of commands and one-time setup tasks needed to go from a fresh clone to a running development environment. Include things like:

- Installing dependencies
- Copying or creating `.env` files and setting required values
- Running database migrations or seed scripts
- Starting the dev server

## Completion

When all `TBD at init` placeholders have been replaced, report:

- Which files were updated
- A brief summary of the values that were filled in
- Any sections that were intentionally left as `TBD at init` because no value could be determined yet
