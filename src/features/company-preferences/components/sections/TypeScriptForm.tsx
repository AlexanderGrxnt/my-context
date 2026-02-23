'use client';
import React from 'react';

import { useAtom } from 'jotai';
import { typeScriptAtom } from '@/lib/atoms';

const TypeScriptForm = (): React.JSX.Element => {
  const [state, setState] = useAtom(typeScriptAtom);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-zinc-700">Strictness level</p>
        <div className="flex gap-4">
          {(['strict', 'moderate', 'loose'] as const).map((level) => (
            <label key={level} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
              <input
                type="radio"
                name="ts-strictness"
                value={level}
                checked={state.strictness === level}
                onChange={() => setState({ ...state, strictness: level })}
                className="border-zinc-300 text-zinc-900 focus:ring-zinc-500"
              />
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {(
          [
            { key: 'requireJsDoc', label: 'Require JSDoc on exported functions' },
            { key: 'preferImmutability', label: 'Prefer immutable patterns (spread over mutation)' },
            { key: 'allowNonNullAssertion', label: 'Allow non-null assertions (!)' },
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
    </div>
  );
};

export { TypeScriptForm };
