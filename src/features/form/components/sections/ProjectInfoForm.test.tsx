import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createStore, Provider } from 'jotai';

import { ProjectInfoForm } from './ProjectInfoForm';
import { projectInfoAtom } from '@/lib/atoms';

const renderWithStore = (store = createStore()) =>
  render(
    <Provider store={store}>
      <ProjectInfoForm />
    </Provider>,
  );

describe('ProjectInfoForm', () => {
  it('renders all three fields', () => {
    renderWithStore();
    expect(screen.getByLabelText('Project name')).toBeInTheDocument();
    expect(screen.getByLabelText('Short description')).toBeInTheDocument();
    expect(screen.getByLabelText('Overview paragraph')).toBeInTheDocument();
  });

  it('displays empty values by default', () => {
    renderWithStore();
    expect(screen.getByLabelText<HTMLInputElement>('Project name').value).toBe('');
    expect(screen.getByLabelText<HTMLInputElement>('Short description').value).toBe('');
    expect(screen.getByLabelText<HTMLTextAreaElement>('Overview paragraph').value).toBe('');
  });

  it('updates the project name atom on input change', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Project name'), { target: { value: 'my-app' } });

    expect(store.get(projectInfoAtom).name).toBe('my-app');
  });

  it('updates the description atom on input change', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Short description'), {
      target: { value: 'A short desc' },
    });

    expect(store.get(projectInfoAtom).description).toBe('A short desc');
  });

  it('updates the overview atom on textarea change', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Overview paragraph'), {
      target: { value: 'Full overview text' },
    });

    expect(store.get(projectInfoAtom).overview).toBe('Full overview text');
  });

  it('reflects pre-seeded atom values in the inputs', () => {
    const store = createStore();
    store.set(projectInfoAtom, { name: 'seeded-name', description: 'seeded-desc', overview: 'seeded-overview', workingWithCodebase: '', bootstrapSteps: '' });
    renderWithStore(store);

    expect(screen.getByLabelText<HTMLInputElement>('Project name').value).toBe('seeded-name');
    expect(screen.getByLabelText<HTMLInputElement>('Short description').value).toBe('seeded-desc');
    expect(screen.getByLabelText<HTMLTextAreaElement>('Overview paragraph').value).toBe('seeded-overview');
  });
});
