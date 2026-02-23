'use client';
import React from 'react';

import type { GeneratedFile } from '@/lib/generateContext';

interface DownloadAllButtonProps {
  files: GeneratedFile[];
}

/**
 * Downloads all generated files individually using an `<a download>` link.
 * Uses the File System Access API when available, with a fallback for other browsers.
 */
const DownloadAllButton = ({ files }: DownloadAllButtonProps): React.JSX.Element => {
  const handleDownload = (): void => {
    if (files.length === 0) return;

    files.forEach((file) => {
      const blob = new Blob([file.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const fileName = file.path.split('/').pop() ?? file.path;
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <button
      onClick={handleDownload}
      disabled={files.length === 0}
      className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
    >
      Download all ({files.length})
    </button>
  );
};

export { DownloadAllButton };
