'use client';
import React from 'react';

import { useAtom } from 'jotai';
import { promptFilesAtom } from '@/lib/atoms';
import type { PromptFileConfig } from '@/lib/atoms';

const AGENT_MODES: PromptFileConfig['agent'][] = ['agent', 'ask', 'edit'];

/**
 * Form section for editing the list of reusable prompt file configurations.
 * Each entry maps to a `.github/prompts/<id>.prompt.md` output file.
 */
const PromptFilesForm = (): React.JSX.Element => {
  const [files, setFiles] = useAtom(promptFilesAtom);

  const updateFile = (id: string, patch: Partial<PromptFileConfig>): void => {
    setFiles(files.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };

  return (
    <div className="flex flex-col gap-4">
      {files.map((file) => (
        <div key={file.id} className="flex flex-col gap-3 rounded-md border border-zinc-200 p-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-zinc-800">
            <input
              type="checkbox"
              checked={file.enabled}
              onChange={(e) => updateFile(file.id, { enabled: e.target.checked })}
              className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500"
            />
            {file.label}
          </label>

          {file.enabled && (
            <>
              <div className="flex flex-col gap-1">
                <label
                  className="text-xs font-medium text-zinc-500"
                  htmlFor={`prompt-label-${file.id}`}
                >
                  Label
                </label>
                <input
                  id={`prompt-label-${file.id}`}
                  type="text"
                  value={file.label}
                  onChange={(e) => updateFile(file.id, { label: e.target.value })}
                  className="rounded border border-zinc-300 px-2 py-1 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="text-xs font-medium text-zinc-500"
                  htmlFor={`prompt-description-${file.id}`}
                >
                  Description
                </label>
                <input
                  id={`prompt-description-${file.id}`}
                  type="text"
                  value={file.description}
                  onChange={(e) => updateFile(file.id, { description: e.target.value })}
                  className="rounded border border-zinc-300 px-2 py-1 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="text-xs font-medium text-zinc-500"
                  htmlFor={`prompt-agent-${file.id}`}
                >
                  Agent mode
                </label>
                <select
                  id={`prompt-agent-${file.id}`}
                  value={file.agent}
                  onChange={(e) =>
                    updateFile(file.id, { agent: e.target.value as PromptFileConfig['agent'] })
                  }
                  className="rounded border border-zinc-300 px-2 py-1 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                >
                  {AGENT_MODES.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="text-xs font-medium text-zinc-500"
                  htmlFor={`prompt-content-${file.id}`}
                >
                  Body
                </label>
                <textarea
                  id={`prompt-content-${file.id}`}
                  rows={10}
                  value={file.content}
                  onChange={(e) => updateFile(file.id, { content: e.target.value })}
                  className="rounded border border-zinc-300 px-2 py-1 font-mono text-xs text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export { PromptFilesForm };
