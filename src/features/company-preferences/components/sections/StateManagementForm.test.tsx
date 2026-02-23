import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createStore, Provider } from 'jotai';

import { StateManagementForm } from './StateManagementForm';
import { stateManagementAtom } from '@/lib/atoms';

const renderWithStore = (store = createStore()) =>
  render(
    <Provider store={store}>
      <StateManagementForm />
    </Provider>,
  );

describe('StateManagementForm', () => {
  it('renders all three fields', () => {
    renderWithStore();
    expect(screen.getByLabelText('Library')).toBeInTheDocument();
    expect(screen.getByLabelText('Atom file location')).toBeInTheDocument();
    expect(screen.getByLabelText('Naming convention')).toBeInTheDocument();
  });

  it('displays default atom values', () => {
    renderWithStore();
    expect(screen.getByLabelText<HTMLInputElement>('Library').value).toBe('Jotai');
    expect(screen.getByLabelText<HTMLInputElement>('Atom file location').value).toBe('src/lib/atoms.ts');
    expect(screen.getByLabelText<HTMLInputElement>('Naming convention').value).toBe(
      'camelCase with Atom suffix',
    );
  });

  it('updates the library in the atom on change', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Library'), { target: { value: 'Zustand' } });

    expect(store.get(stateManagementAtom).library).toBe('Zustand');
  });

  it('updates the atomFileLocation in the atom on change', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Atom file location'), {
      target: { value: 'src/store/atoms.ts' },
    });

    expect(store.get(stateManagementAtom).atomFileLocation).toBe('src/store/atoms.ts');
  });

  it('updates the namingConvention in the atom on change', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Naming convention'), {
      target: { value: 'PascalCase' },
    });

    expect(store.get(stateManagementAtom).namingConvention).toBe('PascalCase');
  });

  it('preserves other fields when one field is updated', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Library'), { target: { value: 'Redux' } });

    const state = store.get(stateManagementAtom);
    expect(state.library).toBe('Redux');
    expect(state.atomFileLocation).toBe('src/lib/atoms.ts');
    expect(state.namingConvention).toBe('camelCase with Atom suffix');
  });

  it('reflects pre-seeded atom values', () => {
    const store = createStore();
    store.set(stateManagementAtom, {
      library: 'Redux',
      atomFileLocation: 'src/store/index.ts',
      namingConvention: 'SCREAMING_SNAKE_CASE',
    });
    renderWithStore(store);

    expect(screen.getByLabelText<HTMLInputElement>('Library').value).toBe('Redux');
    expect(screen.getByLabelText<HTMLInputElement>('Atom file location').value).toBe('src/store/index.ts');
    expect(screen.getByLabelText<HTMLInputElement>('Naming convention').value).toBe('SCREAMING_SNAKE_CASE');
  });
});
