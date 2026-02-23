'use client';
import React from 'react';

import { FormSection } from './FormSection';
import { ProjectInfoForm } from './sections/ProjectInfoForm';
import { TechStackForm } from './sections/TechStackForm';
import { ArchitectureForm } from './sections/ArchitectureForm';
import { PersistenceForm } from './sections/PersistenceForm';
import { AiIntegrationForm } from './sections/AiIntegrationForm';
import { EnvironmentForm } from './sections/EnvironmentForm';
import { WorkingWithCodebaseForm } from './sections/WorkingWithCodebaseForm';
import { VsCodeSettingsForm } from './sections/VsCodeSettingsForm';

/**
 * Left column — scrollable form panel containing all input sections.
 */
const FormPanel = (): React.JSX.Element => {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-zinc-900">my-context</h1>
        <p className="text-sm text-zinc-500">
          Generate GitHub Copilot instruction files for your project
        </p>
      </header>

      <FormSection title="Project Info">
        <ProjectInfoForm />
      </FormSection>

      <FormSection title="Tech Stack">
        <TechStackForm />
      </FormSection>

      <FormSection title="Architecture">
        <ArchitectureForm />
      </FormSection>

      <FormSection title="Persistence">
        <PersistenceForm />
      </FormSection>

      <FormSection title="AI Integration">
        <AiIntegrationForm />
      </FormSection>

      <FormSection title="Environment Variables">
        <EnvironmentForm />
      </FormSection>

      <FormSection title="Working with This Codebase">
        <WorkingWithCodebaseForm />
      </FormSection>

      <FormSection title="VS Code Settings">
        <VsCodeSettingsForm />
      </FormSection>
    </div>
  );
};

export { FormPanel };
