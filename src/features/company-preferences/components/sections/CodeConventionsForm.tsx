'use client';
import React from 'react';

import { useAtom } from 'jotai';
import { codeConventionsAtom } from '@/lib/atoms';

const CodeConventionsForm = (): React.JSX.Element => {
  const [state, setState] = useAtom(codeConventionsAtom);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700" htmlFor="import-alias">
          Import alias
        </label>
        <input
          id="import-alias"
          type="text"
          placeholder="@/*"
          value={state.importAlias}
          onChange={(e) => setState({ ...state, importAlias: e.target.value })}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-zinc-700">Export style</p>
        <div className="flex gap-4">
          {(['named', 'default'] as const).map((style) => (
            <label key={style} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
              <input
                type="radio"
                name="export-style"
                value={style}
                checked={state.exportStyle === style}
                onChange={() => setState({ ...state, exportStyle: style })}
                className="border-zinc-300 text-zinc-900 focus:ring-zinc-500"
              />
              {style === 'named' ? 'Named exports (preferred)' : 'Default exports'}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-zinc-700">Component function style</p>
        <div className="flex gap-4">
          {(['arrow', 'function'] as const).map((style) => (
            <label key={style} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
              <input
                type="radio"
                name="component-style"
                value={style}
                checked={state.componentStyle === style}
                onChange={() => setState({ ...state, componentStyle: style })}
                className="border-zinc-300 text-zinc-900 focus:ring-zinc-500"
              />
              {style === 'arrow' ? 'Arrow function' : 'Function declaration'}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export { CodeConventionsForm };
