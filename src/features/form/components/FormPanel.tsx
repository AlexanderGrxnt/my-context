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
import { HELP_CONTENT } from '@/features/tutorial/helpContent';

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

      <FormSection sectionId="project-info" title="Project Info" helpContent={HELP_CONTENT['project-info']}>
        <ProjectInfoForm />
      </FormSection>

      <FormSection sectionId="tech-stack" title="Tech Stack" helpContent={HELP_CONTENT['tech-stack']}>
        <TechStackForm />
      </FormSection>

      <FormSection sectionId="architecture" title="Architecture" helpContent={HELP_CONTENT['architecture']}>
        <ArchitectureForm />
      </FormSection>

      <FormSection sectionId="persistence" title="Persistence" helpContent={HELP_CONTENT['persistence']}>
        <PersistenceForm />
      </FormSection>

      <FormSection sectionId="ai-integration" title="AI Integration" helpContent={HELP_CONTENT['ai-integration']}>
        <AiIntegrationForm />
      </FormSection>

      <FormSection sectionId="environment" title="Environment Variables" helpContent={HELP_CONTENT['environment']}>
        <EnvironmentForm />
      </FormSection>

      <FormSection sectionId="working-with-codebase" title="Working with This Codebase" helpContent={HELP_CONTENT['working-with-codebase']}>
        <WorkingWithCodebaseForm />
      </FormSection>

      <FormSection sectionId="vscode-settings" title="VS Code Settings" helpContent={HELP_CONTENT['vscode-settings']}>
        <VsCodeSettingsForm />
      </FormSection>
    </div>
  );
};

export { FormPanel };
