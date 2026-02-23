---
applyTo: "**/*.tsx"
---

## React Component Rules

- Use arrow-function components with explicit return types: `const Foo = (): React.JSX.Element => {}`
- Named exports only; default exports are reserved for Next.js page and layout files
- All interactive components must include the `'use client'` directive at the top of the file
- Keep components single-responsibility and under ~150 lines where possible
- Decompose large components into smaller co-located sub-components rather than growing a single file

## Tailwind CSS

- Use Tailwind utility classes exclusively — no inline styles or CSS-in-JS
- Group classes in logical order: layout → spacing → colour → interactive states
- Prefer readable class groupings over compressed single-line strings
- Always handle edge cases (empty arrays, undefined values) gracefully in rendered output
