import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createStore, Provider } from 'jotai';

import { CodeConventionsForm } from './CodeConventionsForm';
import { codeConventionsAtom } from '@/lib/atoms';

const renderWithStore = (store = createStore()) =>
  render(
    <Provider store={store}>
      <CodeConventionsForm />
    </Provider>,
  );

describe('CodeConventionsForm', () => {
  it('renders the import alias input', () => {
    renderWithStore();
    expect(screen.getByLabelText('Import alias')).toBeInTheDocument();
  });

  it('renders export style radio buttons', () => {
    renderWithStore();
    expect(screen.getByRole('radio', { name: 'Named exports (preferred)' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Default exports' })).toBeInTheDocument();
  });

  it('renders component function style radio buttons', () => {
    renderWithStore();
    expect(screen.getByRole('radio', { name: 'Arrow function' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Function declaration' })).toBeInTheDocument();
  });

  it('shows default import alias value', () => {
    renderWithStore();
    expect(screen.getByLabelText<HTMLInputElement>('Import alias').value).toBe('@/*');
  });

  it('defaults to named export style selected', () => {
    renderWithStore();
    expect(screen.getByRole<HTMLInputElement>('radio', { name: 'Named exports (preferred)' }).checked).toBe(true);
    expect(screen.getByRole<HTMLInputElement>('radio', { name: 'Default exports' }).checked).toBe(false);
  });

  it('defaults to arrow function component style selected', () => {
    renderWithStore();
    expect(screen.getByRole<HTMLInputElement>('radio', { name: 'Arrow function' }).checked).toBe(true);
    expect(screen.getByRole<HTMLInputElement>('radio', { name: 'Function declaration' }).checked).toBe(false);
  });

  it('updates the importAlias atom on input change', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Import alias'), { target: { value: '~/*' } });

    expect(store.get(codeConventionsAtom).importAlias).toBe('~/*');
  });

  it('updates the exportStyle atom when default radio is selected', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.click(screen.getByRole('radio', { name: 'Default exports' }));

    expect(store.get(codeConventionsAtom).exportStyle).toBe('default');
  });

  it('updates the componentStyle atom when function declaration is selected', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.click(screen.getByRole('radio', { name: 'Function declaration' }));

    expect(store.get(codeConventionsAtom).componentStyle).toBe('function');
  });

  it('reflects pre-seeded atom values', () => {
    const store = createStore();
    store.set(codeConventionsAtom, {
      importAlias: '~/*',
      exportStyle: 'default',
      componentStyle: 'function',
    });
    renderWithStore(store);

    expect(screen.getByLabelText<HTMLInputElement>('Import alias').value).toBe('~/*');
    expect(screen.getByRole<HTMLInputElement>('radio', { name: 'Default exports' }).checked).toBe(true);
    expect(screen.getByRole<HTMLInputElement>('radio', { name: 'Function declaration' }).checked).toBe(true);
  });
});
