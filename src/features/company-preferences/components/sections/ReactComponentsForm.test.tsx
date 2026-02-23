import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createStore, Provider } from 'jotai';

import { ReactComponentsForm } from './ReactComponentsForm';
import { reactComponentsAtom } from '@/lib/atoms';

const renderWithStore = (store = createStore()) =>
  render(
    <Provider store={store}>
      <ReactComponentsForm />
    </Provider>,
  );

describe('ReactComponentsForm', () => {
  it('renders the two boolean checkboxes', () => {
    renderWithStore();
    expect(
      screen.getByRole('checkbox', { name: "Require 'use client' on all interactive components" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: 'Tailwind only — no inline styles or CSS-in-JS' }),
    ).toBeInTheDocument();
  });

  it('renders the max file length input', () => {
    renderWithStore();
    expect(screen.getByLabelText('Max file length (lines)')).toBeInTheDocument();
  });

  it('defaults requireUseClient and tailwindOnly to checked', () => {
    renderWithStore();
    expect(
      screen.getByRole<HTMLInputElement>('checkbox', { name: "Require 'use client' on all interactive components" }).checked,
    ).toBe(true);
    expect(
      screen.getByRole<HTMLInputElement>('checkbox', { name: 'Tailwind only — no inline styles or CSS-in-JS' }).checked,
    ).toBe(true);
  });

  it('shows default max file length of 150', () => {
    renderWithStore();
    expect(screen.getByLabelText<HTMLInputElement>('Max file length (lines)').value).toBe('150');
  });

  it('toggles requireUseClient in the atom', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.click(
      screen.getByRole('checkbox', { name: "Require 'use client' on all interactive components" }),
    );

    expect(store.get(reactComponentsAtom).requireUseClient).toBe(false);
  });

  it('toggles tailwindOnly in the atom', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Tailwind only — no inline styles or CSS-in-JS' }),
    );

    expect(store.get(reactComponentsAtom).tailwindOnly).toBe(false);
  });

  it('updates maxFileLength in the atom on input change', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Max file length (lines)'), {
      target: { value: '200' },
    });

    expect(store.get(reactComponentsAtom).maxFileLength).toBe(200);
  });

  it('falls back to 150 when an invalid value is entered for maxFileLength', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Max file length (lines)'), {
      target: { value: '' },
    });

    expect(store.get(reactComponentsAtom).maxFileLength).toBe(150);
  });

  it('reflects pre-seeded atom values', () => {
    const store = createStore();
    store.set(reactComponentsAtom, {
      componentPattern: 'arrow',
      requireUseClient: false,
      tailwindOnly: false,
      maxFileLength: 300,
    });
    renderWithStore(store);

    expect(
      screen.getByRole<HTMLInputElement>('checkbox', { name: "Require 'use client' on all interactive components" }).checked,
    ).toBe(false);
    expect(screen.getByLabelText<HTMLInputElement>('Max file length (lines)').value).toBe('300');
  });
});
