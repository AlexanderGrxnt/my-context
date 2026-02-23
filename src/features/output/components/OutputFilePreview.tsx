'use client';
import React from 'react';

interface OutputFilePreviewProps {
  content: string;
}

/**
 * Renders generated file content in a scrollable pre block.
 */
const OutputFilePreview = ({ content }: OutputFilePreviewProps): React.JSX.Element => {
  if (!content.trim()) {
    return (
      <p className="text-sm text-zinc-400 italic">No content generated yet.</p>
    );
  }

  return (
    <pre className="overflow-x-auto rounded-md bg-zinc-900 p-4 text-xs leading-relaxed text-zinc-100 whitespace-pre-wrap break-words">
      {content}
    </pre>
  );
};

export { OutputFilePreview };
