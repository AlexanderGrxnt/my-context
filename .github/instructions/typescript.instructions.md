---
applyTo: "**/*.ts, **/*.tsx"
---

## TypeScript

- Always use strict TypeScript types — avoid `any` and `unknown` without explicit narrowing
- Prefer `interface` for object shapes that may be extended; use `type` for unions, intersections, and aliases
- Never use non-null assertion (`!`) — use optional chaining (`?.`) or explicit guards instead
- Export types alongside their related functions or components; collect shared/cross-cutting types in `src/types/`

## JSDoc

- Add concise JSDoc comments to all exported utility functions and hooks
- Include `@param` and `@returns` tags for non-obvious signatures
- One-line summary is sufficient for simple functions; only expand when behaviour is non-obvious

## Immutability & Patterns

- Prefer immutable data patterns — use spread operators (`...`) instead of mutation
- Prefer functional / declarative patterns over imperative loops (`map`, `filter`, `reduce` over `for`)
- Always handle edge cases (empty arrays, `undefined`, `null`) gracefully
