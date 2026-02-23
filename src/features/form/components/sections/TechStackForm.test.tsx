import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createStore, Provider } from 'jotai';

import { TechStackForm } from './TechStackForm';
import { techStackAtom } from '@/lib/atoms';

const renderWithStore = (store = createStore()) =>
  render(
    <Provider store={store}>
      <TechStackForm />
    </Provider>,
  );

describe('TechStackForm', () => {
  it('renders all six fields', () => {
    renderWithStore();
    expect(screen.getByLabelText('Framework')).toBeInTheDocument();
    expect(screen.getByLabelText('Language')).toBeInTheDocument();
    expect(screen.getByLabelText('Styling')).toBeInTheDocument();
    expect(screen.getByLabelText('State management')).toBeInTheDocument();
    expect(screen.getByLabelText('Testing')).toBeInTheDocument();
    expect(screen.getByLabelText('Runtime')).toBeInTheDocument();
  });

  it('displays the default atom values in each input', () => {
    renderWithStore();
    expect(screen.getByLabelText<HTMLInputElement>('Framework').value).toBe('Next.js 15 (App Router)');
    expect(screen.getByLabelText<HTMLInputElement>('Language').value).toBe('TypeScript');
    expect(screen.getByLabelText<HTMLInputElement>('Styling').value).toBe('Tailwind CSS v4');
    expect(screen.getByLabelText<HTMLInputElement>('State management').value).toBe('Jotai');
    expect(screen.getByLabelText<HTMLInputElement>('Testing').value).toBe('Jest + React Testing Library');
    expect(screen.getByLabelText<HTMLInputElement>('Runtime').value).toBe('Node.js');
  });

  it('updates the framework field in the atom on change', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Framework'), { target: { value: 'Remix' } });

    expect(store.get(techStackAtom).framework).toBe('Remix');
  });

  it('updates the language field in the atom on change', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Language'), { target: { value: 'JavaScript' } });

    expect(store.get(techStackAtom).language).toBe('JavaScript');
  });

  it('preserves other fields when one field is updated', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Runtime'), { target: { value: 'Bun' } });

    const state = store.get(techStackAtom);
    expect(state.runtime).toBe('Bun');
    expect(state.framework).toBe('Next.js 15 (App Router)');
    expect(state.language).toBe('TypeScript');
  });

  it('reflects pre-seeded atom values', () => {
    const store = createStore();
    store.set(techStackAtom, {
      framework: 'Vite',
      language: 'JavaScript',
      styling: 'CSS Modules',
      stateManagement: 'Redux',
      testing: 'Vitest',
      runtime: 'Bun',
      testingNotes: '',
    });
    renderWithStore(store);

    expect(screen.getByLabelText<HTMLInputElement>('Framework').value).toBe('Vite');
    expect(screen.getByLabelText<HTMLInputElement>('Runtime').value).toBe('Bun');
  });
});
