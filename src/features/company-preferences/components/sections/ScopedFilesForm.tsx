'use client';
import React from 'react';

import { useAtom, useAtomValue } from 'jotai';
import { scopedFilesAtom, outputAtom } from '@/lib/atoms';
import { generateScopedInstructionFile } from '@/lib/generateContext';

const ScopedFilesForm = (): React.JSX.Element => {
  const [files, setFiles] = useAtom(scopedFilesAtom);
  const state = useAtomValue(outputAtom);

  const updateFile = (id: string, patch: Partial<(typeof files)[number]>): void => {
    setFiles(files.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };

  /** Strip the YAML frontmatter (first 4 lines) to get just the rule body. */
  const getPreviewContent = (file: (typeof files)[number]): string => {
    const full = generateScopedInstructionFile(file, state);
    return full.split('\n').slice(4).join('\n');
  };

  return (
    <div className="flex flex-col gap-4">
      {files.map((file) => (
        <div key={file.id} className="flex flex-col gap-2 rounded-md border border-zinc-200 p-4">
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
                  htmlFor={`apply-to-${file.id}`}
                >
                  applyTo glob
                </label>
                <input
                  id={`apply-to-${file.id}`}
                  type="text"
                  value={file.applyTo}
                  onChange={(e) => updateFile(file.id, { applyTo: e.target.value })}
                  className="rounded border border-zinc-300 px-2 py-1 text-xs text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="text-xs font-medium text-zinc-500"
                  htmlFor={`content-${file.id}`}
                >
                  Generated rules
                </label>
                <textarea
                  id={`content-${file.id}`}
                  readOnly
                  rows={6}
                  value={getPreviewContent(file)}
                  className="cursor-default rounded border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs text-zinc-600 focus:outline-none"
                />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export { ScopedFilesForm };
