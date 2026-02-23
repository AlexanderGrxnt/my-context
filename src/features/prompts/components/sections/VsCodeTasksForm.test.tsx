import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createStore, Provider } from 'jotai';

import { VsCodeTasksForm } from './VsCodeTasksForm';
import { vsCodeTasksAtom, defaultVsCodeTasks } from '@/lib/atoms';

const renderWithStore = (store = createStore()) =>
  render(
    <Provider store={store}>
      <VsCodeTasksForm />
    </Provider>,
  );

describe('VsCodeTasksForm', () => {
  it('renders a label input for each default task', () => {
    renderWithStore();
    defaultVsCodeTasks.tasks.forEach((_, index) => {
      expect(
        screen.getByLabelText('Label', { selector: `#task-label-${index}` }),
      ).toBeInTheDocument();
    });
  });

  it('shows the default task label values', () => {
    renderWithStore();
    defaultVsCodeTasks.tasks.forEach((task, index) => {
      const input = screen.getByLabelText<HTMLInputElement>('Label', {
        selector: `#task-label-${index}`,
      });
      expect(input.value).toBe(task.label);
    });
  });

  it('shows the default command values', () => {
    renderWithStore();
    defaultVsCodeTasks.tasks.forEach((task, index) => {
      const input = screen.getByLabelText<HTMLInputElement>('Command', {
        selector: `#task-command-${index}`,
      });
      expect(input.value).toBe(task.command);
    });
  });

  it('updates the task label atom when the input changes', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Label', { selector: '#task-label-0' }), {
      target: { value: 'my-build' },
    });

    expect(store.get(vsCodeTasksAtom).tasks[0].label).toBe('my-build');
  });

  it('updates the command atom when the input changes', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Command', { selector: '#task-command-0' }), {
      target: { value: 'yarn build' },
    });

    expect(store.get(vsCodeTasksAtom).tasks[0].command).toBe('yarn build');
  });

  it('updates the group atom when the select changes', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Group', { selector: '#task-group-0' }), {
      target: { value: 'test' },
    });

    expect(store.get(vsCodeTasksAtom).tasks[0].group).toBe('test');
  });

  it('parses comma-separated problem matchers into an array', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.change(screen.getByLabelText('Problem matcher', { selector: '#task-matcher-0' }), {
      target: { value: '$tsc, $eslint-stylish' },
    });

    expect(store.get(vsCodeTasksAtom).tasks[0].problemMatcher).toEqual(['$tsc', '$eslint-stylish']);
  });

  it('removes a task when the remove button is clicked', () => {
    const store = createStore();
    renderWithStore(store);

    const removeButtons = screen.getAllByRole('button', { name: /remove/i });
    fireEvent.click(removeButtons[0]);

    expect(store.get(vsCodeTasksAtom).tasks).toHaveLength(defaultVsCodeTasks.tasks.length - 1);
  });

  it('adds a new empty task when the add button is clicked', () => {
    const store = createStore();
    renderWithStore(store);

    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    expect(store.get(vsCodeTasksAtom).tasks).toHaveLength(defaultVsCodeTasks.tasks.length + 1);
  });

  it('renders an Add task button', () => {
    renderWithStore();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });
});
