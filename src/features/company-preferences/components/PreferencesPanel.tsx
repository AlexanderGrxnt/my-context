'use client';
import React from 'react';

import { FormSection } from '@/features/form';
import { FolderStructureForm } from './sections/FolderStructureForm';
import { CodeConventionsForm } from './sections/CodeConventionsForm';
import { TypeScriptForm } from './sections/TypeScriptForm';
import { ReactComponentsForm } from './sections/ReactComponentsForm';
import { StateManagementForm } from './sections/StateManagementForm';
import { ScopedFilesForm } from './sections/ScopedFilesForm';
import { HELP_CONTENT } from '@/features/tutorial/helpContent';

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

      <FormSection sectionId="folder-structure" title="Folder Structure" helpContent={HELP_CONTENT['folder-structure']}>
        <FolderStructureForm />
      </FormSection>

      <FormSection sectionId="code-conventions" title="Code Conventions" helpContent={HELP_CONTENT['code-conventions']}>
        <CodeConventionsForm />
      </FormSection>

      <FormSection sectionId="typescript" title="TypeScript" helpContent={HELP_CONTENT['typescript']}>
        <TypeScriptForm />
      </FormSection>

      <FormSection sectionId="react-components" title="React Components" helpContent={HELP_CONTENT['react-components']}>
        <ReactComponentsForm />
      </FormSection>

      <FormSection sectionId="state-management" title="State Management" helpContent={HELP_CONTENT['state-management']}>
        <StateManagementForm />
      </FormSection>

      <FormSection sectionId="scoped-files" title="Scoped Instruction Files" helpContent={HELP_CONTENT['scoped-files']}>
        <ScopedFilesForm />
      </FormSection>
    </div>
  );
};

export { PreferencesPanel };
