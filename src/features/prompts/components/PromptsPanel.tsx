'use client';
import React from 'react';

import { FormSection } from '@/features/form';
import { PromptFilesForm } from './sections/PromptFilesForm';
import { VsCodeTasksForm } from './sections/VsCodeTasksForm';

/**
 * Left column for the Prompts & Tasks page — scrollable panel containing
 * the prompt file editor and VS Code tasks editor.
 */
const PromptsPanel = (): React.JSX.Element => {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-zinc-900">Prompts &amp; Tasks</h1>
        <p className="text-sm text-zinc-500">
          Reusable prompt files and VS Code tasks saved across all projects
        </p>
      </header>

      <FormSection title="Prompt Files">
        <PromptFilesForm />
      </FormSection>

      <FormSection title="VS Code Tasks">
        <VsCodeTasksForm />
      </FormSection>
    </div>
  );
};

export { PromptsPanel };
