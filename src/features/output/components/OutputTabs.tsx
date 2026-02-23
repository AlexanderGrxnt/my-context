'use client';
import React from 'react';

import { useState } from 'react';
import type { GeneratedFile } from '@/lib/generateContext';
import { OutputFilePreview } from './OutputFilePreview';
import { CopyButton } from './CopyButton';

interface OutputTabsProps {
  files: GeneratedFile[];
}

const OutputTabs = ({ files }: OutputTabsProps): React.JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeIndex = activeIndex < files.length ? activeIndex : 0;
  const activeFile = files[safeIndex];

  return (
    <div className="flex flex-col gap-0">
      <div className="flex flex-wrap gap-1 border-b border-zinc-200 pb-2">
        {files.map((file, index) => (
          <button
            key={file.path}
            onClick={() => setActiveIndex(index)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              index === safeIndex
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {file.path.split('/').pop()}
          </button>
        ))}
      </div>

      {activeFile && (
        <div className="mt-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400">{activeFile.path}</span>
            <CopyButton content={activeFile.content} />
          </div>
          <OutputFilePreview content={activeFile.content} />
        </div>
      )}
    </div>
  );
};

export { OutputTabs };
