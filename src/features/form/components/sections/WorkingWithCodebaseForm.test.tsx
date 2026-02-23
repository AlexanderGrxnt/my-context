import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createStore, Provider } from 'jotai';

import { WorkingWithCodebaseForm } from './WorkingWithCodebaseForm';
import { projectInfoAtom } from '@/lib/atoms';

const renderWithStore = (store = createStore()) =>
  render(
    <Provider store={store}>
      <WorkingWithCodebaseForm />
    </Provider>,
  );

describe('WorkingWithCodebaseForm', () => {
  it('renders the instructions textarea', () => {
    renderWithStore();
    expect(screen.getByLabelText('Instructions')).toBeInTheDocument();
  });

  it('displays the default working-with-codebase text', () => {
    renderWithStore();
    const textarea = screen.getByLabelText<HTMLTextAreaElement>('Instructions');
    expect(textarea.value).toContain('Before implementing anything');
  });

  it('updates the workingWithCodebase field in the atom on change', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Instructions'), {
      target: { value: 'Custom codebase instructions.' },
    });

    expect(store.get(projectInfoAtom).workingWithCodebase).toBe('Custom codebase instructions.');
  });

  it('preserves other projectInfo fields when workingWithCodebase is updated', () => {
    const store = createStore();
    store.set(projectInfoAtom, {
      ...store.get(projectInfoAtom),
      name: 'my-app',
      description: 'A test app',
    });
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Instructions'), {
      target: { value: 'New instructions.' },
    });

    const state = store.get(projectInfoAtom);
    expect(state.name).toBe('my-app');
    expect(state.description).toBe('A test app');
    expect(state.workingWithCodebase).toBe('New instructions.');
  });

  it('reflects pre-seeded atom values in the textarea', () => {
    const store = createStore();
    store.set(projectInfoAtom, {
      ...store.get(projectInfoAtom),
      workingWithCodebase: 'Pre-seeded instructions.',
    });
    renderWithStore(store);

    expect(screen.getByLabelText<HTMLTextAreaElement>('Instructions').value).toBe(
      'Pre-seeded instructions.',
    );
  });
});
