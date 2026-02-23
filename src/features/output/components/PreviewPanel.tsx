'use client';
import React from 'react';

import { useAtomValue } from 'jotai';
import { outputAtom } from '@/lib/atoms';
import { generateAllFiles } from '@/lib/generateContext';
import { OutputTabs } from './OutputTabs';
import { DownloadAllButton } from './DownloadAllButton';

/**
 * Right column — sticky preview panel showing all generated output files.
 */
const PreviewPanel = (): React.JSX.Element => {
  const state = useAtomValue(outputAtom);
  const files = generateAllFiles(state);

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-zinc-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-700">Output Preview</h2>
          <DownloadAllButton files={files} />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {files.length === 0 ? (
          <p className="text-sm text-zinc-400">
            Fill in the form to generate your instruction files.
          </p>
        ) : (
          <OutputTabs files={files} />
        )}
      </div>
    </div>
  );
};

export { PreviewPanel };
