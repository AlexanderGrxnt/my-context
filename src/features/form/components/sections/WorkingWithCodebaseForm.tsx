'use client';
import React from 'react';

import { useAtom } from 'jotai';
import { projectInfoAtom } from '@/lib/atoms';

const WorkingWithCodebaseForm = (): React.JSX.Element => {
  const [state, setState] = useAtom(projectInfoAtom);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-zinc-700" htmlFor="working-with-codebase">
        Instructions
      </label>
      <textarea
        id="working-with-codebase"
        rows={6}
        placeholder="Describe how to approach working with this codebase..."
        value={state.workingWithCodebase}
        onChange={(e) => setState({ ...state, workingWithCodebase: e.target.value })}
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
      />
    </div>
  );
};

export { WorkingWithCodebaseForm };
