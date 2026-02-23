import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createStore, Provider } from 'jotai';

import { VsCodeSettingsForm } from './VsCodeSettingsForm';
import { vsCodeSettingsAtom } from '@/lib/atoms';

const renderWithStore = (store = createStore()) =>
  render(
    <Provider store={store}>
      <VsCodeSettingsForm />
    </Provider>,
  );

describe('VsCodeSettingsForm', () => {
  it('renders all four textarea fields', () => {
    renderWithStore();
    expect(screen.getByLabelText('Code generation')).toBeInTheDocument();
    expect(screen.getByLabelText('Test generation')).toBeInTheDocument();
    expect(screen.getByLabelText('Code review')).toBeInTheDocument();
    expect(screen.getByLabelText('Commit messages')).toBeInTheDocument();
  });

  it('displays default values', () => {
    renderWithStore();
    expect(screen.getByLabelText<HTMLTextAreaElement>('Code generation').value).toBe('');
    expect(screen.getByLabelText<HTMLTextAreaElement>('Test generation').value).toContain(
      'Use Jest and React Testing Library'
    );
    expect(screen.getByLabelText<HTMLTextAreaElement>('Code review').value).toContain(
      'Flag any use of `any`'
    );
    expect(screen.getByLabelText<HTMLTextAreaElement>('Commit messages').value).toContain(
      'Use conventional commits format'
    );
  });

  it('updates the codeGeneration field in the atom on change', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Code generation'), {
      target: { value: 'Always use named exports.' },
    });

    expect(store.get(vsCodeSettingsAtom).codeGeneration).toBe('Always use named exports.');
  });

  it('updates the testGeneration field in the atom on change', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Test generation'), {
      target: { value: 'Use Jest + RTL.' },
    });

    expect(store.get(vsCodeSettingsAtom).testGeneration).toBe('Use Jest + RTL.');
  });

  it('updates the codeReview field in the atom on change', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Code review'), {
      target: { value: 'Flag any use of `any`.' },
    });

    expect(store.get(vsCodeSettingsAtom).codeReview).toBe('Flag any use of `any`.');
  });

  it('updates the commitMessages field in the atom on change', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Commit messages'), {
      target: { value: 'Use conventional commits.' },
    });

    expect(store.get(vsCodeSettingsAtom).commitMessages).toBe('Use conventional commits.');
  });

  it('preserves other fields when one field is updated', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Code generation'), {
      target: { value: 'Use arrow functions.' },
    });

    const state = store.get(vsCodeSettingsAtom);
    expect(state.codeGeneration).toBe('Use arrow functions.');
    expect(state.testGeneration).toContain('Use Jest and React Testing Library');
    expect(state.codeReview).toContain('Flag any use of `any`');
    expect(state.commitMessages).toContain('Use conventional commits format');
  });

  it('reflects pre-seeded atom values', () => {
    const store = createStore();
    store.set(vsCodeSettingsAtom, {
      codeGeneration: 'pre-seeded codegen',
      testGeneration: 'pre-seeded test',
      codeReview: 'pre-seeded review',
      commitMessages: 'pre-seeded commit',
    });
    renderWithStore(store);

    expect(screen.getByLabelText<HTMLTextAreaElement>('Code generation').value).toBe('pre-seeded codegen');
    expect(screen.getByLabelText<HTMLTextAreaElement>('Commit messages').value).toBe('pre-seeded commit');
  });
});
