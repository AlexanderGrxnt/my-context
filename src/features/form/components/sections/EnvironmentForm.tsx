'use client';
import React from 'react';

import { useAtom } from 'jotai';
import { environmentAtom } from '@/lib/atoms';
import type { EnvVarEntry } from '@/lib/atoms';

const EnvironmentForm = (): React.JSX.Element => {
  const [state, setState] = useAtom(environmentAtom);

  const addVar = (): void => {
    setState({ vars: [...state.vars, { name: '', description: '' }] });
  };

  const updateVar = (index: number, field: keyof EnvVarEntry, value: string): void => {
    const updated = state.vars.map((v, i) => (i === index ? { ...v, [field]: value } : v));
    setState({ vars: updated });
  };

  const removeVar = (index: number): void => {
    setState({ vars: state.vars.filter((_, i) => i !== index) });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-700">Environment variables</p>
        <button
          type="button"
          onClick={addVar}
          className="rounded-md bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-200"
        >
          + Add variable
        </button>
      </div>
      {state.vars.length === 0 && (
        <p className="text-sm italic text-zinc-400">No environment variables added yet</p>
      )}
      {state.vars.map((v, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="VAR_NAME"
            value={v.name}
            onChange={(e) => updateVar(index, 'name', e.target.value)}
            className="w-1/3 rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm uppercase text-zinc-900 placeholder:normal-case placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={v.description}
            onChange={(e) => updateVar(index, 'description', e.target.value)}
            className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
          <button
            type="button"
            onClick={() => removeVar(index)}
            className="shrink-0 rounded-md p-2 text-zinc-400 hover:text-zinc-700"
            aria-label="Remove variable"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export { EnvironmentForm };
