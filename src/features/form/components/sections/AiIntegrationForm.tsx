'use client';
import React from 'react';

import { useAtom } from 'jotai';
import { aiIntegrationAtom } from '@/lib/atoms';

const AiIntegrationForm = (): React.JSX.Element => {
  const [state, setState] = useAtom(aiIntegrationAtom);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700" htmlFor="ai-provider">
            Provider
          </label>
          <input
            id="ai-provider"
            type="text"
            placeholder="e.g. OpenAI, Anthropic, Google"
            value={state.provider}
            onChange={(e) => setState({ ...state, provider: e.target.value })}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700" htmlFor="ai-sdk">
            SDK
          </label>
          <input
            id="ai-sdk"
            type="text"
            placeholder="e.g. openai, ai (Vercel), @anthropic-ai/sdk"
            value={state.sdk}
            onChange={(e) => setState({ ...state, sdk: e.target.value })}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700" htmlFor="ai-approach">
          Integration approach
        </label>
        <input
          id="ai-approach"
          type="text"
          placeholder="e.g. Server Action, Route Handler (/api/ai), client-side streaming"
          value={state.approach}
          onChange={(e) => setState({ ...state, approach: e.target.value })}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700" htmlFor="ai-notes">
          Notes
        </label>
        <textarea
          id="ai-notes"
          rows={3}
          placeholder="Prompt design notes, model choice, token limits, rate-limiting approach..."
          value={state.notes}
          onChange={(e) => setState({ ...state, notes: e.target.value })}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>
    </div>
  );
};

export { AiIntegrationForm };
