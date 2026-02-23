import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createStore, Provider } from 'jotai';

import { FolderStructureForm } from './FolderStructureForm';
import { folderStructureAtom } from '@/lib/atoms';

const renderWithStore = (store = createStore()) =>
  render(
    <Provider store={store}>
      <FolderStructureForm />
    </Provider>,
  );

describe('FolderStructureForm', () => {
  it('renders all 13 folder checkboxes', () => {
    renderWithStore();
    const expectedFolders = [
      'actions/', 'app/', 'assets/', 'components/', 'config/', 'features/',
      'hooks/', 'lib/', 'providers/', 'states/', 'test/', 'types/', 'utils/',
    ];
    expectedFolders.forEach((folder) => {
      expect(screen.getByText(folder)).toBeInTheDocument();
    });
  });

  it('shows default checked folders from the atom', () => {
    const store = createStore();
    renderWithStore(store);

    const defaultFolders = ['app', 'components', 'lib', 'providers', 'types', 'utils'];
    defaultFolders.forEach((folder) => {
      const checkbox = screen.getByRole('checkbox', { name: `${folder}/` });
      expect(checkbox).toBeChecked();
    });
  });

  it('shows non-default folders as unchecked', () => {
    renderWithStore();
    const checkbox = screen.getByRole('checkbox', { name: 'features/' });
    expect(checkbox).not.toBeChecked();
  });

  it('adds a folder to the atom when its checkbox is checked', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.click(screen.getByRole('checkbox', { name: 'features/' }));

    expect(store.get(folderStructureAtom).folders).toContain('features');
  });

  it('removes a folder from the atom when its checkbox is unchecked', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.click(screen.getByRole('checkbox', { name: 'app/' }));

    expect(store.get(folderStructureAtom).folders).not.toContain('app');
  });

  it('renders the feature module checkbox unchecked by default', () => {
    renderWithStore();
    const featureCheckbox = screen.getByRole('checkbox', {
      name: /use feature module pattern/i,
    });
    expect(featureCheckbox).not.toBeChecked();
  });

  it('updates useFeatureModules in the atom when toggled', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.click(
      screen.getByRole('checkbox', { name: /use feature module pattern/i }),
    );

    expect(store.get(folderStructureAtom).useFeatureModules).toBe(true);
  });

  it('preserves existing folders when toggling useFeatureModules', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.click(
      screen.getByRole('checkbox', { name: /use feature module pattern/i }),
    );

    const state = store.get(folderStructureAtom);
    expect(state.useFeatureModules).toBe(true);
    expect(state.folders).toContain('app');
  });
});
