'use client';

import React from 'react';
import { useAtom } from 'jotai';

import { helpModalAtom } from '@/lib/atoms';

/**
 * Global help modal overlay. Rendered inside JotaiProvider in the root layout.
 * Displays when helpModalAtom is non-null; clicking "Got it" or the backdrop clears it.
 */
export const HelpModal = (): React.JSX.Element | null => {
  const [content, setContent] = useAtom(helpModalAtom);

  if (!content) return null;

  const handleClose = () => setContent(null);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-zinc-200 px-6 py-4">
          <h2
            id="help-modal-title"
            className="text-base font-semibold text-zinc-900"
          >
            {content.title}
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-sm leading-relaxed text-zinc-600">{content.body}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-zinc-200 px-6 py-4">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
