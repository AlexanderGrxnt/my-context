'use client';
import React from 'react';

import type { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

/**
 * Reusable wrapper that renders a titled section block within the form panel.
 */
const FormSection = ({ title, children }: FormSectionProps): React.JSX.Element => {
  return (
    <section className="border-b border-zinc-200 px-6 py-6 last:border-b-0">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-400">
        {title}
      </h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
};

export { FormSection };
