---
agent: ask
description: Review selected code against project conventions
---

Review the selected code against the my-context project conventions and report each violation with file, line, and a suggested fix.

## TypeScript
- [ ] No use of `any` or `unknown` without explicit narrowing
- [ ] No non-null assertions (`!`) — use optional chaining or guards instead
- [ ] `interface` used for extendable object shapes; `type` for unions/aliases
- [ ] Exported types live alongside their function/component or in `src/types/`

## React Components
- [ ] Arrow-function component with explicit return type: `const Foo = (): React.JSX.Element => {}`
- [ ] Named export (default export only for Next.js page/layout files)
- [ ] `'use client'` directive present on all interactive components
- [ ] Component is under ~150 lines; large components are decomposed
- [ ] No inline styles — Tailwind utility classes only

## State Management
- [ ] No `useState` for shared state — Jotai only (`useAtom`, `useAtomValue`, `useSetAtom`)
- [ ] No atoms defined outside `src/lib/atoms.ts`
- [ ] No React Context used for shared state

## General
- [ ] `@/*` import alias used (not relative `../../`)
- [ ] Edge cases handled (empty arrays, `undefined`, `null`)
- [ ] JSDoc present on all exported utility functions and hooks
