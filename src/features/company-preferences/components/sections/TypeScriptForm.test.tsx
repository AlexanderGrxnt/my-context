import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createStore, Provider } from 'jotai';

import { TypeScriptForm } from './TypeScriptForm';
import { typeScriptAtom } from '@/lib/atoms';

const renderWithStore = (store = createStore()) =>
  render(
    <Provider store={store}>
      <TypeScriptForm />
    </Provider>,
  );

describe('TypeScriptForm', () => {
  it('renders the three strictness radio buttons', () => {
    renderWithStore();
    expect(screen.getByRole('radio', { name: 'Strict' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Moderate' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Loose' })).toBeInTheDocument();
  });

  it('renders the three boolean checkboxes', () => {
    renderWithStore();
    expect(screen.getByRole('checkbox', { name: 'Require JSDoc on exported functions' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Prefer immutable patterns (spread over mutation)' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Allow non-null assertions (!)' })).toBeInTheDocument();
  });

  it('defaults to strict strictness', () => {
    renderWithStore();
    expect(screen.getByRole<HTMLInputElement>('radio', { name: 'Strict' }).checked).toBe(true);
    expect(screen.getByRole<HTMLInputElement>('radio', { name: 'Moderate' }).checked).toBe(false);
    expect(screen.getByRole<HTMLInputElement>('radio', { name: 'Loose' }).checked).toBe(false);
  });

  it('defaults requireJsDoc and preferImmutability checked, allowNonNullAssertion unchecked', () => {
    renderWithStore();
    expect(screen.getByRole<HTMLInputElement>('checkbox', { name: 'Require JSDoc on exported functions' }).checked).toBe(true);
    expect(screen.getByRole<HTMLInputElement>('checkbox', { name: 'Prefer immutable patterns (spread over mutation)' }).checked).toBe(true);
    expect(screen.getByRole<HTMLInputElement>('checkbox', { name: 'Allow non-null assertions (!)' }).checked).toBe(false);
  });

  it('updates strictness atom when a different radio is selected', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.click(screen.getByRole('radio', { name: 'Moderate' }));

    expect(store.get(typeScriptAtom).strictness).toBe('moderate');
  });

  it('toggles requireJsDoc in the atom', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.click(screen.getByRole('checkbox', { name: 'Require JSDoc on exported functions' }));

    expect(store.get(typeScriptAtom).requireJsDoc).toBe(false);
  });

  it('toggles preferImmutability in the atom', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.click(screen.getByRole('checkbox', { name: 'Prefer immutable patterns (spread over mutation)' }));

    expect(store.get(typeScriptAtom).preferImmutability).toBe(false);
  });

  it('toggles allowNonNullAssertion in the atom', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.click(screen.getByRole('checkbox', { name: 'Allow non-null assertions (!)' }));

    expect(store.get(typeScriptAtom).allowNonNullAssertion).toBe(true);
  });

  it('reflects pre-seeded atom values', () => {
    const store = createStore();
    store.set(typeScriptAtom, {
      strictness: 'loose',
      requireJsDoc: false,
      preferImmutability: false,
      allowNonNullAssertion: true,
    });
    renderWithStore(store);

    expect(screen.getByRole<HTMLInputElement>('radio', { name: 'Loose' }).checked).toBe(true);
    expect(screen.getByRole<HTMLInputElement>('checkbox', { name: 'Allow non-null assertions (!)' }).checked).toBe(true);
  });
});
