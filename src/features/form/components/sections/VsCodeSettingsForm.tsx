'use client';
import React from 'react';

import { useAtom } from 'jotai';
import { vsCodeSettingsAtom } from '@/lib/atoms';
import type { VsCodeSettingsState } from '@/lib/atoms';

const fields: { key: keyof VsCodeSettingsState; label: string; placeholder: string }[] = [
  {
    key: 'codeGeneration',
    label: 'Code generation',
    placeholder: 'e.g. Always use named exports. Prefer arrow-function components.',
  },
  {
    key: 'testGeneration',
    label: 'Test generation',
    placeholder: 'e.g. Use Jest + React Testing Library. Co-locate test files.',
  },
  {
    key: 'codeReview',
    label: 'Code review',
    placeholder: 'e.g. Flag any use of `any` or non-null assertions.',
  },
  {
    key: 'commitMessages',
    label: 'Commit messages',
    placeholder: 'e.g. Use conventional commits: type(scope): description.',
  },
];

const VsCodeSettingsForm = (): React.JSX.Element => {
  const [state, setState] = useAtom(vsCodeSettingsAtom);

  return (
    <div className="flex flex-col gap-4">
      {fields.map(({ key, label, placeholder }) => (
        <div key={key} className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700" htmlFor={`vscode-${key}`}>
            {label}
          </label>
          <textarea
            id={`vscode-${key}`}
            rows={2}
            placeholder={placeholder}
            value={state[key]}
            onChange={(e) => setState({ ...state, [key]: e.target.value })}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
        </div>
      ))}
    </div>
  );
};

export { VsCodeSettingsForm };
