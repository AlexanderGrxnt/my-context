'use client';
import React from 'react';

import { zipSync, strToU8 } from 'fflate';
import type { GeneratedFile } from '@/lib/generateContext';

interface DownloadAllButtonProps {
  files: GeneratedFile[];
}

/**
 * Downloads all generated files as a single `.zip` archive that preserves
 * the correct subfolder structure (e.g. `.github/instructions/`, `.vscode/`).
 * Uses `fflate` for client-side zip generation.
 */
const DownloadAllButton = ({ files }: DownloadAllButtonProps): React.JSX.Element => {
  const handleDownload = (): void => {
    if (files.length === 0) return;

    const entries = Object.fromEntries(
      files.map((file) => [file.path, strToU8(file.content)])
    );

    const zipped = zipSync(entries);
    // fflate types the buffer as ArrayBufferLike but always returns a plain ArrayBuffer
    const blob = new Blob([zipped.buffer as ArrayBuffer], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'copilot-context.zip';
    a.click();
    URL.revokeObjectURL(url);
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
