'use client';
import React from 'react';

import { useAtom } from 'jotai';
import { techStackAtom } from '@/lib/atoms';
import type { TechStackState } from '@/lib/atoms';

const fields: { key: keyof TechStackState; label: string; placeholder: string }[] = [
  { key: 'framework', label: 'Framework', placeholder: 'e.g. Next.js 15 (App Router)' },
  { key: 'language', label: 'Language', placeholder: 'e.g. TypeScript' },
  { key: 'styling', label: 'Styling', placeholder: 'e.g. Tailwind CSS v4' },
  { key: 'stateManagement', label: 'State management', placeholder: 'e.g. Jotai' },
  { key: 'testing', label: 'Testing', placeholder: 'e.g. Jest + React Testing Library' },
  { key: 'runtime', label: 'Runtime', placeholder: 'e.g. Node.js' },
];

const TechStackForm = (): React.JSX.Element => {
  const [state, setState] = useAtom(techStackAtom);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {fields.map(({ key, label, placeholder }) => (
          <div key={key} className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700" htmlFor={`tech-${key}`}>
              {label}
            </label>
            <input
              id={`tech-${key}`}
              type="text"
              placeholder={placeholder}
              value={state[key]}
              onChange={(e) => setState({ ...state, [key]: e.target.value })}
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700" htmlFor="testing-notes">
          Testing strategy{' '}
          <span className="font-normal text-zinc-400">(optional)</span>
        </label>
        <textarea
          id="testing-notes"
          rows={3}
          placeholder="What to test, where test files live, coverage expectations..."
          value={state.testingNotes}
          onChange={(e) => setState({ ...state, testingNotes: e.target.value })}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>
    </div>
  );
};

export { TechStackForm };
