import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createStore, Provider } from 'jotai';

import { PromptFilesForm } from './PromptFilesForm';
import { promptFilesAtom, defaultPromptFiles } from '@/lib/atoms';

const renderWithStore = (store = createStore()) =>
  render(
    <Provider store={store}>
      <PromptFilesForm />
    </Provider>,
  );

describe('PromptFilesForm', () => {
  it('renders a checkbox for each default prompt file', () => {
    renderWithStore();
    defaultPromptFiles.forEach((file) => {
      expect(screen.getByRole('checkbox', { name: file.label })).toBeInTheDocument();
    });
  });

  it('shows label, description, agent mode, and body fields for enabled files', () => {
    renderWithStore();
    const enabledFile = defaultPromptFiles.find((f) => f.enabled);
    if (!enabledFile) return;

    expect(
      screen.getByLabelText('Label', { selector: `#prompt-label-${enabledFile.id}` }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Description', { selector: `#prompt-description-${enabledFile.id}` }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Agent mode', { selector: `#prompt-agent-${enabledFile.id}` }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Body', { selector: `#prompt-content-${enabledFile.id}` }),
    ).toBeInTheDocument();
  });

  it('displays the default body content in the textarea', () => {
    renderWithStore();
    const firstFile = defaultPromptFiles[0];
    const textarea = screen.getByLabelText<HTMLTextAreaElement>('Body', {
      selector: `#prompt-content-${firstFile.id}`,
    });
    expect(textarea.value.length).toBeGreaterThan(0);
  });

  it('hides fields when a file is disabled', () => {
    const store = createStore();
    store.set(promptFilesAtom, [
      { ...defaultPromptFiles[0], enabled: false },
      ...defaultPromptFiles.slice(1),
    ]);
    renderWithStore(store);

    expect(
      screen.queryByLabelText('Label', { selector: `#prompt-label-${defaultPromptFiles[0].id}` }),
    ).not.toBeInTheDocument();
  });

  it('toggles a file off when its checkbox is unchecked', () => {
    const store = createStore();
    renderWithStore(store);

    const firstFile = defaultPromptFiles[0];
    fireEvent.click(screen.getByRole('checkbox', { name: firstFile.label }));

    expect(store.get(promptFilesAtom)[0].enabled).toBe(false);
  });

  it('updates the label atom when the label input changes', () => {
    const store = createStore();
    renderWithStore(store);

    const firstFile = defaultPromptFiles[0];
    fireEvent.change(
      screen.getByLabelText('Label', { selector: `#prompt-label-${firstFile.id}` }),
      { target: { value: 'New Label' } },
    );

    expect(store.get(promptFilesAtom)[0].label).toBe('New Label');
  });

  it('updates the description atom when the description input changes', () => {
    const store = createStore();
    renderWithStore(store);

    const firstFile = defaultPromptFiles[0];
    fireEvent.change(
      screen.getByLabelText('Description', {
        selector: `#prompt-description-${firstFile.id}`,
      }),
      { target: { value: 'New description' } },
    );

    expect(store.get(promptFilesAtom)[0].description).toBe('New description');
  });

  it('updates the agent mode atom when the select changes', () => {
    const store = createStore();
    renderWithStore(store);

    const firstFile = defaultPromptFiles[0];
    fireEvent.change(
      screen.getByLabelText('Agent mode', { selector: `#prompt-agent-${firstFile.id}` }),
      { target: { value: 'ask' } },
    );

    expect(store.get(promptFilesAtom)[0].agent).toBe('ask');
  });

  it('updates the content atom when the body textarea changes', () => {
    const store = createStore();
    renderWithStore(store);

    const firstFile = defaultPromptFiles[0];
    fireEvent.change(
      screen.getByLabelText('Body', { selector: `#prompt-content-${firstFile.id}` }),
      { target: { value: 'Updated body content' } },
    );

    expect(store.get(promptFilesAtom)[0].content).toBe('Updated body content');
  });
});
