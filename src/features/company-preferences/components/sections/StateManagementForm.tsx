'use client';
import React from 'react';

import { useAtom } from 'jotai';
import { stateManagementAtom } from '@/lib/atoms';

const StateManagementForm = (): React.JSX.Element => {
  const [state, setState] = useAtom(stateManagementAtom);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700" htmlFor="state-library">
          Library
        </label>
        <input
          id="state-library"
          type="text"
          placeholder="e.g. Jotai"
          value={state.library}
          onChange={(e) => setState({ ...state, library: e.target.value })}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700" htmlFor="atom-file-location">
          Atom file location
        </label>
        <input
          id="atom-file-location"
          type="text"
          placeholder="e.g. src/lib/atoms.ts"
          value={state.atomFileLocation}
          onChange={(e) => setState({ ...state, atomFileLocation: e.target.value })}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700" htmlFor="naming-convention">
          Naming convention
        </label>
        <input
          id="naming-convention"
          type="text"
          placeholder="e.g. camelCase with Atom suffix"
          value={state.namingConvention}
          onChange={(e) => setState({ ...state, namingConvention: e.target.value })}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>
    </div>
  );
};

export { StateManagementForm };
