import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createStore, Provider } from 'jotai';

import { HelpModal } from './HelpModal';
import { helpModalAtom } from '@/lib/atoms';

const renderModal = (store = createStore()) =>
  render(
    <Provider store={store}>
      <HelpModal />
    </Provider>,
  );

describe('HelpModal', () => {
  it('renders nothing when helpModalAtom is null', () => {
    const { container } = renderModal();
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the modal when helpModalAtom has content', () => {
    const store = createStore();
    store.set(helpModalAtom, { title: 'Project Info', body: 'Fill in the project name.' });
    renderModal(store);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Project Info')).toBeInTheDocument();
    expect(screen.getByText('Fill in the project name.')).toBeInTheDocument();
  });

  it('clicking "Got it" sets helpModalAtom to null', () => {
    const store = createStore();
    store.set(helpModalAtom, { title: 'Tech Stack', body: 'Pick your framework.' });
    renderModal(store);

    fireEvent.click(screen.getByRole('button', { name: 'Got it' }));

    expect(store.get(helpModalAtom)).toBeNull();
  });

  it('clicking the backdrop sets helpModalAtom to null', () => {
    const store = createStore();
    store.set(helpModalAtom, { title: 'TypeScript', body: 'Choose strictness.' });
    renderModal(store);

    // Click the outer backdrop div
    fireEvent.click(screen.getByRole('dialog'));

    expect(store.get(helpModalAtom)).toBeNull();
  });

  it('clicking inside the modal content does not close the modal', () => {
    const store = createStore();
    store.set(helpModalAtom, { title: 'State Management', body: 'Pick a library.' });
    renderModal(store);

    fireEvent.click(screen.getByText('Pick a library.'));

    expect(store.get(helpModalAtom)).not.toBeNull();
  });

  it('displays different content when helpModalAtom changes', () => {
    const store = createStore();
    store.set(helpModalAtom, { title: 'Section A', body: 'Body A' });
    const { rerender } = renderModal(store);

    expect(screen.getByText('Section A')).toBeInTheDocument();

    store.set(helpModalAtom, { title: 'Section B', body: 'Body B' });
    rerender(
      <Provider store={store}>
        <HelpModal />
      </Provider>,
    );

    expect(screen.getByText('Section B')).toBeInTheDocument();
    expect(screen.queryByText('Section A')).not.toBeInTheDocument();
  });
});
