---
agent: agent
description: Implement a feature then iterate until tests and lint are green
---

Implement the requested feature following all project conventions, then complete the verification loop below. Do not consider the task done until every step passes.

## Implementation Checklist
- Follow the component hierarchy defined in `.github/instructions/design.instructions.md`
- Place atoms in `src/lib/atoms.ts` — never inline
- Use Tailwind utility classes only — no inline styles
- Use `@/*` import alias throughout
- Named exports only (default for Next.js page/layout files)

## Verification Loop

### Step 1 — Tests
1. Write co-located tests as `<filename>.test.tsx` / `<filename>.test.ts` next to the source file
2. Cover: happy path, empty/null state, and key edge cases
3. Mock Jotai atoms using a `createStore` from `jotai` — do not mock module internals
4. Test observable behaviour and rendered output — not implementation details
5. Run: `npm test -- --testPathPattern=<filename> --watchAll=false`
6. If tests fail, fix the source or test and re-run — repeat until green

### Step 2 — Lint
1. Run: `npm run lint`
2. Fix all reported errors and re-run until clean

### Step 3 — Type Check
1. Run: `npx tsc --noEmit`
2. Fix all type errors and re-run until clean

### Step 4 — Final Confirmation
Report:
- Files created or modified
- Test results (pass count)
- Lint status
- Type check status
