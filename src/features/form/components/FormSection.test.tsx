import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createStore, Provider } from 'jotai';

import { FormSection } from './FormSection';
import { sectionExpandedAtom, helpModalAtom, defaultSectionExpanded } from '@/lib/atoms';

const HELP = { title: 'Project Info', body: 'Enter your project name.' };

const renderSection = (store = createStore(), props: Partial<React.ComponentProps<typeof FormSection>> = {}) =>
  render(
    <Provider store={store}>
      <FormSection sectionId="project-info" title="Project Info" {...props}>
        <span>Content</span>
      </FormSection>
    </Provider>,
  );

describe('FormSection', () => {
  it('shows the section title', () => {
    renderSection();
    expect(screen.getByText('Project Info')).toBeInTheDocument();
  });

  it('expands by default for project-info (defaultSectionExpanded)', () => {
    renderSection();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('collapses by default for a non-project-info section', () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <FormSection sectionId="tech-stack" title="Tech Stack">
          <span>Hidden content</span>
        </FormSection>
      </Provider>,
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('toggles expand/collapse when header is clicked', () => {
    const store = createStore();
    renderSection(store);

    // project-info starts expanded — clicking should collapse
    fireEvent.click(screen.getByRole('button', { name: 'Project Info' }));
    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    // click again to re-expand
    fireEvent.click(screen.getByRole('button', { name: 'Project Info' }));
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('persists expanded state to sectionExpandedAtom', () => {
    const store = createStore();
    // Start with project-info collapsed
    store.set(sectionExpandedAtom, { ...defaultSectionExpanded, 'project-info': false });
    renderSection(store);

    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Project Info' }));

    expect(store.get(sectionExpandedAtom)['project-info']).toBe(true);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('does not render a help button when no helpContent is provided', () => {
    renderSection();
    expect(screen.queryByRole('button', { name: /help for/i })).not.toBeInTheDocument();
  });

  it('renders a help button when helpContent is provided', () => {
    renderSection(createStore(), { helpContent: HELP });
    expect(screen.getByRole('button', { name: 'Help for Project Info' })).toBeInTheDocument();
  });

  it('clicking the help button sets helpModalAtom without toggling the section', () => {
    const store = createStore();
    renderSection(store, { helpContent: HELP });

    fireEvent.click(screen.getByRole('button', { name: 'Help for Project Info' }));

    expect(store.get(helpModalAtom)).toEqual(HELP);
    // section should still be expanded (project-info default)
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('respects a pre-seeded collapsed state', () => {
    const store = createStore();
    store.set(sectionExpandedAtom, { ...defaultSectionExpanded, 'project-info': false });
    renderSection(store);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });
});
