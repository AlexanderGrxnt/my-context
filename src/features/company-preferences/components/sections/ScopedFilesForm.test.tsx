import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createStore, Provider } from 'jotai';

import { ScopedFilesForm } from './ScopedFilesForm';
import { scopedFilesAtom, defaultScopedFiles } from '@/lib/atoms';

const renderWithStore = (store = createStore()) =>
  render(
    <Provider store={store}>
      <ScopedFilesForm />
    </Provider>,
  );

describe('ScopedFilesForm', () => {
  it('renders a checkbox for each default scoped file', () => {
    renderWithStore();
    defaultScopedFiles.forEach((file) => {
      expect(screen.getByRole('checkbox', { name: file.label })).toBeInTheDocument();
    });
  });

  it('shows the applyTo field for enabled files', () => {
    renderWithStore();
    const enabledFile = defaultScopedFiles.find((f) => f.enabled);
    if (!enabledFile) return;

    expect(screen.getByLabelText(`applyTo glob`, { selector: `#apply-to-${enabledFile.id}` })).toBeInTheDocument();
  });

  it('shows a read-only generated rules textarea for enabled files', () => {
    renderWithStore();
    const enabledFile = defaultScopedFiles.find((f) => f.enabled);
    if (!enabledFile) return;

    const textarea = screen.getByLabelText<HTMLTextAreaElement>('Generated rules', {
      selector: `#content-${enabledFile.id}`,
    });
    expect(textarea).toBeInTheDocument();
    expect(textarea.readOnly).toBe(true);
    expect(textarea.value.length).toBeGreaterThan(0);
  });

  it('hides the applyTo and generated rules fields when a file is disabled', () => {
    const store = createStore();
    store.set(scopedFilesAtom, [
      { ...defaultScopedFiles[0], enabled: false },
      ...defaultScopedFiles.slice(1),
    ]);
    renderWithStore(store);

    expect(screen.queryByLabelText(`applyTo glob`, { selector: `#apply-to-${defaultScopedFiles[0].id}` })).not.toBeInTheDocument();    expect(screen.queryByLabelText('Generated rules', { selector: `#content-${defaultScopedFiles[0].id}` })).not.toBeInTheDocument();  });

  it('toggles a file off when its checkbox is unchecked', () => {
    const store = createStore();
    renderWithStore(store);

    const firstEnabledFile = defaultScopedFiles.find((f) => f.enabled);
    if (!firstEnabledFile) return;

    fireEvent.click(screen.getByRole('checkbox', { name: firstEnabledFile.label }));

    const updated = store.get(scopedFilesAtom).find((f) => f.id === firstEnabledFile.id);
    expect(updated?.enabled).toBe(false);
  });

  it('toggles a file on when its checkbox is checked', () => {
    const store = createStore();
    store.set(scopedFilesAtom, [
      { ...defaultScopedFiles[0], enabled: false },
      ...defaultScopedFiles.slice(1),
    ]);
    renderWithStore(store);

    fireEvent.click(screen.getByRole('checkbox', { name: defaultScopedFiles[0].label }));

    const updated = store.get(scopedFilesAtom).find((f) => f.id === defaultScopedFiles[0].id);
    expect(updated?.enabled).toBe(true);
  });

  it('updates the applyTo field in the atom on change', () => {
    const store = createStore();
    renderWithStore(store);

    const firstEnabledFile = defaultScopedFiles.find((f) => f.enabled);
    if (!firstEnabledFile) return;

    fireEvent.change(screen.getByLabelText('applyTo glob', { selector: `#apply-to-${firstEnabledFile.id}` }), {
      target: { value: 'src/**/*.ts' },
    });

    const updated = store.get(scopedFilesAtom).find((f) => f.id === firstEnabledFile.id);
    expect(updated?.applyTo).toBe('src/**/*.ts');
  });

  it('does not affect other files when one file is updated', () => {
    const store = createStore();
    renderWithStore(store);

    const [firstFile, secondFile] = defaultScopedFiles.filter((f) => f.enabled);
    if (!firstFile || !secondFile) return;

    fireEvent.change(screen.getByLabelText('applyTo glob', { selector: `#apply-to-${firstFile.id}` }), {
      target: { value: '**/*.new' },
    });

    const secondUpdated = store.get(scopedFilesAtom).find((f) => f.id === secondFile.id);
    expect(secondUpdated?.applyTo).toBe(secondFile.applyTo);
  });

  it('renders an empty state gracefully when the atom has no files', () => {
    const store = createStore();
    store.set(scopedFilesAtom, []);
    const { container } = renderWithStore(store);

    expect(container.querySelectorAll('input[type="checkbox"]')).toHaveLength(0);
  });
});
