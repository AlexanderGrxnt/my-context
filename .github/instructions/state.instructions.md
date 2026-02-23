---
applyTo: "src/**"
---

## Jotai State Management

- Use `useAtom`, `useAtomValue`, or `useSetAtom` from Jotai for all shared state — never React Context
- All atoms must be defined in `src/lib/atoms.ts` — never define atoms inline inside components
- Prefer `useAtomValue` (read-only) or `useSetAtom` (write-only) over `useAtom` when you only need one capability
- Atom names should be camelCase and suffixed with `Atom`: e.g. `projectNameAtom`
- Derived/computed values should use `atom(get => ...)` selector atoms defined in `src/lib/atoms.ts`
