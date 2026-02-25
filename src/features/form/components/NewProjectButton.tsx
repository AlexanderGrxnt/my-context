'use client';

import React from 'react';
import { useSetAtom } from 'jotai';

import {
  projectInfoAtom,
  techStackAtom,
  vsCodeSettingsAtom,
  architectureAtom,
  persistenceAtom,
  aiIntegrationAtom,
  environmentAtom,
  sectionExpandedAtom,
  defaultProjectInfo,
  defaultTechStack,
  defaultVsCodeSettings,
  defaultArchitecture,
  defaultPersistence,
  defaultAiIntegration,
  defaultEnvironment,
  defaultSectionExpanded,
} from '@/lib/atoms';

/**
 * Resets all session-only project atoms to their default values and collapses
 * all sections (except Project Info, which returns to its default expanded state).
 * Company preference atoms are intentionally left untouched.
 */
export const NewProjectButton = (): React.JSX.Element => {
  const setProjectInfo = useSetAtom(projectInfoAtom);
  const setTechStack = useSetAtom(techStackAtom);
  const setVsCodeSettings = useSetAtom(vsCodeSettingsAtom);
  const setArchitecture = useSetAtom(architectureAtom);
  const setPersistence = useSetAtom(persistenceAtom);
  const setAiIntegration = useSetAtom(aiIntegrationAtom);
  const setEnvironment = useSetAtom(environmentAtom);
  const setSectionExpanded = useSetAtom(sectionExpandedAtom);

  const handleClick = () => {
    setProjectInfo(defaultProjectInfo);
    setTechStack(defaultTechStack);
    setVsCodeSettings(defaultVsCodeSettings);
    setArchitecture(defaultArchitecture);
    setPersistence(defaultPersistence);
    setAiIntegration(defaultAiIntegration);
    setEnvironment(defaultEnvironment);
    setSectionExpanded(defaultSectionExpanded);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-zinc-600 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
    >
      New Project
    </button>
  );
};
