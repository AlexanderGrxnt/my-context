'use client';
import React from 'react';

import { FormSection } from '@/features/form';
import { FolderStructureForm } from './sections/FolderStructureForm';
import { CodeConventionsForm } from './sections/CodeConventionsForm';
import { TypeScriptForm } from './sections/TypeScriptForm';
import { ReactComponentsForm } from './sections/ReactComponentsForm';
import { StateManagementForm } from './sections/StateManagementForm';
import { ScopedFilesForm } from './sections/ScopedFilesForm';

/**
 * Left column for the Preferences page — scrollable panel containing all
 * company-wide preference sections.
 */
const PreferencesPanel = (): React.JSX.Element => {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-zinc-900">Company Preferences</h1>
        <p className="text-sm text-zinc-500">
          Reusable conventions saved across all projects
        </p>
      </header>

      <FormSection title="Folder Structure">
        <FolderStructureForm />
      </FormSection>

      <FormSection title="Code Conventions">
        <CodeConventionsForm />
      </FormSection>

      <FormSection title="TypeScript">
        <TypeScriptForm />
      </FormSection>

      <FormSection title="React Components">
        <ReactComponentsForm />
      </FormSection>

      <FormSection title="State Management">
        <StateManagementForm />
      </FormSection>

      <FormSection title="Scoped Instruction Files">
        <ScopedFilesForm />
      </FormSection>
    </div>
  );
};

export { PreferencesPanel };
