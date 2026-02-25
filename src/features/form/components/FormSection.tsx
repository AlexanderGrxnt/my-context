'use client';
import React from 'react';

import type { ReactNode } from 'react';
import { useAtom, useSetAtom } from 'jotai';

import { sectionExpandedAtom, helpModalAtom, defaultSectionExpanded } from '@/lib/atoms';
import type { HelpModalContent } from '@/lib/atoms';

interface FormSectionProps {
  /** Stable unique ID used as the key in sectionExpandedAtom */
  sectionId: string;
  title: string;
  /** If provided, an ⓘ button appears in the header that opens the help modal */
  helpContent?: HelpModalContent;
  children: ReactNode;
}

/**
 * Collapsible section wrapper used across all form panels.
 * Collapse state is persisted to localStorage via sectionExpandedAtom.
 */
const FormSection = ({ sectionId, title, helpContent, children }: FormSectionProps): React.JSX.Element => {
  const [expandedMap, setExpandedMap] = useAtom(sectionExpandedAtom);
  const setHelpModal = useSetAtom(helpModalAtom);

  // Fall back to the static default if the key is not yet in storage
  const isExpanded = expandedMap[sectionId] ?? defaultSectionExpanded[sectionId] ?? false;

  const toggle = () => {
    setExpandedMap((prev) => ({ ...prev, [sectionId]: !isExpanded }));
  };

  const handleHelpClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (helpContent) setHelpModal(helpContent);
  };

  return (
    <section className="border-b border-zinc-200 last:border-b-0">
      {/* Header row */}
      <div
        className="flex cursor-pointer items-center justify-between px-6 py-4 hover:bg-zinc-50"
        onClick={toggle}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
          {title}
        </h2>

        <div className="flex shrink-0 items-center gap-2">
          {helpContent && (
            <button
              type="button"
              aria-label={`Help for ${title}`}
              onClick={handleHelpClick}
              className="flex h-6 w-6 items-center justify-center rounded-full text-xs text-zinc-400 ring-1 ring-zinc-300 hover:bg-zinc-100 hover:text-zinc-600"
            >
              ⓘ
            </button>
          )}

          {/* Chevron */}
          <span
            aria-hidden="true"
            className={`text-zinc-400 transition-transform duration-150 ${isExpanded ? 'rotate-180' : ''}`}
          >
            ▼
          </span>
        </div>
      </div>

      {/* Collapsible body */}
      {isExpanded && (
        <div className="flex flex-col gap-4 px-6 pb-6">
          {children}
        </div>
      )}
    </section>
  );
};

export { FormSection };
