'use client';
import React from 'react';

import { useAtom } from 'jotai';
import { persistenceAtom } from '@/lib/atoms';

const PersistenceForm = (): React.JSX.Element => {
  const [state, setState] = useAtom(persistenceAtom);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700" htmlFor="persistence-strategy">
            Strategy
          </label>
          <input
            id="persistence-strategy"
            type="text"
            placeholder="e.g. Supabase, SQLite, localStorage, None"
            value={state.strategy}
            onChange={(e) => setState({ ...state, strategy: e.target.value })}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700" htmlFor="persistence-tool">
            ORM / tool
          </label>
          <input
            id="persistence-tool"
            type="text"
            placeholder="e.g. Prisma, Drizzle, Supabase JS"
            value={state.tool}
            onChange={(e) => setState({ ...state, tool: e.target.value })}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700" htmlFor="persistence-notes">
          Notes
        </label>
        <textarea
          id="persistence-notes"
          rows={3}
          placeholder="Schema location, migration approach, connection details..."
          value={state.notes}
          onChange={(e) => setState({ ...state, notes: e.target.value })}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>
    </div>
  );
};

export { PersistenceForm };
