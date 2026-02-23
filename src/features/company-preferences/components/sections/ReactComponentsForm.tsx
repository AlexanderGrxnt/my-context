'use client';
import React from 'react';

import { useAtom } from 'jotai';
import { reactComponentsAtom } from '@/lib/atoms';

const ReactComponentsForm = (): React.JSX.Element => {
  const [state, setState] = useAtom(reactComponentsAtom);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {(
          [
            { key: 'requireUseClient', label: "Require 'use client' on all interactive components" },
            { key: 'tailwindOnly', label: 'Tailwind only — no inline styles or CSS-in-JS' },
          ] as const
        ).map(({ key, label }) => (
          <label key={key} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={state[key]}
              onChange={(e) => setState({ ...state, [key]: e.target.checked })}
              className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500"
            />
            {label}
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700" htmlFor="max-file-length">
          Max file length (lines)
        </label>
        <input
          id="max-file-length"
          type="number"
          min={50}
          max={500}
          step={25}
          value={state.maxFileLength}
          onChange={(e) =>
            setState({ ...state, maxFileLength: parseInt(e.target.value, 10) || 150 })
          }
          className="w-32 rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>
    </div>
  );
};

export { ReactComponentsForm };
