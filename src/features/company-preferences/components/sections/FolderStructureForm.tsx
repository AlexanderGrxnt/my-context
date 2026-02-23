'use client';
import React from 'react';

import { useAtom } from 'jotai';
import { folderStructureAtom } from '@/lib/atoms';
import type { FeatureEntry } from '@/lib/atoms';

const ALL_FOLDERS = [
  'actions',
  'app',
  'assets',
  'components',
  'config',
  'features',
  'hooks',
  'lib',
  'providers',
  'states',
  'test',
  'types',
  'utils',
];

const FolderStructureForm = (): React.JSX.Element => {
  const [state, setState] = useAtom(folderStructureAtom);

  const toggleFolder = (folder: string): void => {
    const updated = state.folders.includes(folder)
      ? state.folders.filter((f) => f !== folder)
      : [...state.folders, folder];
    setState({ ...state, folders: updated });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-zinc-700">Top-level src/ folders</p>
        <div className="grid grid-cols-3 gap-2">
          {ALL_FOLDERS.map((folder) => (
            <label
              key={folder}
              className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700"
            >
              <input
                type="checkbox"
                checked={state.folders.includes(folder)}
                onChange={() => toggleFolder(folder)}
                className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500"
              />
              {folder}/
            </label>
          ))}
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
        <input
          type="checkbox"
          checked={state.useFeatureModules}
          onChange={(e) => setState({ ...state, useFeatureModules: e.target.checked })}
          className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500"
        />
        Use feature module pattern (src/features/&lt;name&gt;/)
      </label>

      {state.useFeatureModules && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-700">Named features</p>
            <button
              type="button"
              onClick={() =>
                setState({
                  ...state,
                  features: [...(state.features ?? []), { name: '', description: '' }],
                })
              }
              className="rounded-md bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-200"
            >
              + Add feature
            </button>
          </div>
          {(state.features ?? []).length === 0 && (
            <p className="text-sm italic text-zinc-400">No named features added yet</p>
          )}
          {(state.features ?? []).map((feature: FeatureEntry, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="feature-name"
                value={feature.name}
                onChange={(e) => {
                  const updated = (state.features ?? []).map((f, i) =>
                    i === index ? { ...f, name: e.target.value } : f
                  );
                  setState({ ...state, features: updated });
                }}
                className="w-1/3 rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
              <input
                type="text"
                placeholder="Description"
                value={feature.description}
                onChange={(e) => {
                  const updated = (state.features ?? []).map((f, i) =>
                    i === index ? { ...f, description: e.target.value } : f
                  );
                  setState({ ...state, features: updated });
                }}
                className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
              <button
                type="button"
                onClick={() =>
                  setState({
                    ...state,
                    features: (state.features ?? []).filter((_, i) => i !== index),
                  })
                }
                className="shrink-0 rounded-md p-2 text-zinc-400 hover:text-zinc-700"
                aria-label="Remove feature"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { FolderStructureForm };
