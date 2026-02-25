import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createStore, Provider } from 'jotai';

import { NewProjectButton } from './NewProjectButton';
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
  defaultSectionExpanded,
} from '@/lib/atoms';

const renderButton = (store = createStore()) =>
  render(
    <Provider store={store}>
      <NewProjectButton />
    </Provider>,
  );

describe('NewProjectButton', () => {
  it('renders a button labelled "New Project"', () => {
    renderButton();
    expect(screen.getByRole('button', { name: 'New Project' })).toBeInTheDocument();
  });

  it('resets projectInfoAtom to default values', () => {
    const store = createStore();
    store.set(projectInfoAtom, { ...defaultProjectInfo, name: 'My App', description: 'A cool app', overview: 'overview', workingWithCodebase: '', bootstrapSteps: '' });
    renderButton(store);

    fireEvent.click(screen.getByRole('button', { name: 'New Project' }));

    expect(store.get(projectInfoAtom).name).toBe('');
    expect(store.get(projectInfoAtom).description).toBe('');
  });

  it('resets techStackAtom to default values', () => {
    const store = createStore();
    store.set(techStackAtom, { ...defaultTechStack, framework: 'Remix' });
    renderButton(store);

    fireEvent.click(screen.getByRole('button', { name: 'New Project' }));

    expect(store.get(techStackAtom).framework).toBe(defaultTechStack.framework);
  });

  it('resets sectionExpandedAtom to defaultSectionExpanded', () => {
    const store = createStore();
    // Expand all sections
    store.set(sectionExpandedAtom, Object.fromEntries(
      Object.keys(defaultSectionExpanded).map((k) => [k, true]),
    ));
    renderButton(store);

    fireEvent.click(screen.getByRole('button', { name: 'New Project' }));

    const expanded = store.get(sectionExpandedAtom);
    expect(expanded['project-info']).toBe(true);
    expect(expanded['tech-stack']).toBe(false);
    expect(expanded['vscode-settings']).toBe(false);
  });

  it('resets architectureAtom, persistenceAtom, aiIntegrationAtom, environmentAtom', () => {
    const store = createStore();
    store.set(architectureAtom, { routes: [{ path: '/test', description: 'Test' }], domainTypes: [], componentHierarchy: 'Root' });
    store.set(persistenceAtom, { strategy: 'db', tool: 'Prisma', notes: 'note' });
    store.set(aiIntegrationAtom, { provider: 'OpenAI', sdk: 'openai', approach: 'streaming', notes: '' });
    store.set(environmentAtom, { vars: [{ name: 'API_KEY', description: 'Key' }] });
    renderButton(store);

    fireEvent.click(screen.getByRole('button', { name: 'New Project' }));

    expect(store.get(architectureAtom).routes).toHaveLength(0);
    expect(store.get(persistenceAtom).strategy).toBe('');
    expect(store.get(aiIntegrationAtom).provider).toBe('');
    expect(store.get(environmentAtom).vars).toHaveLength(0);
  });

  it('does not reset vsCodeSettingsAtom (project atom) — wait, it should', () => {
    // vsCodeSettingsAtom IS a project atom and should be reset
    const store = createStore();
    store.set(vsCodeSettingsAtom, {
      codeGeneration: 'custom',
      testGeneration: 'custom',
      codeReview: 'custom',
      commitMessages: 'custom',
    });
    renderButton(store);

    fireEvent.click(screen.getByRole('button', { name: 'New Project' }));

    expect(store.get(vsCodeSettingsAtom).codeGeneration).toBe('');
  });
});
