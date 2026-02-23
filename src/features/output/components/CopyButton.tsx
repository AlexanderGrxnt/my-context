'use client';
import React from 'react';

import { useState } from 'react';

interface CopyButtonProps {
  content: string;
}

/**
 * Copies the provided text content to the clipboard.
 * Shows transient feedback on success.
 */
const CopyButton = ({ content }: CopyButtonProps): React.JSX.Element => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard access denied — silent fail
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded-md border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

export { CopyButton };
