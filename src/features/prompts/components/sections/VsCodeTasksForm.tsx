'use client';
import React from 'react';

import { useAtom } from 'jotai';
import { vsCodeTasksAtom } from '@/lib/atoms';
import type { VsCodeTaskEntry } from '@/lib/atoms';

const TASK_GROUPS = ['build', 'test', 'none'];

/**
 * Form section for editing the list of VS Code task definitions.
 * Each entry maps to an entry in the `.vscode/tasks.json` output file.
 */
const VsCodeTasksForm = (): React.JSX.Element => {
  const [state, setState] = useAtom(vsCodeTasksAtom);

  const updateTask = (index: number, patch: Partial<VsCodeTaskEntry>): void => {
    setState({
      tasks: state.tasks.map((t, i) => (i === index ? { ...t, ...patch } : t)),
    });
  };

  const removeTask = (index: number): void => {
    setState({ tasks: state.tasks.filter((_, i) => i !== index) });
  };

  const addTask = (): void => {
    setState({
      tasks: [...state.tasks, { label: '', command: '', group: 'build', problemMatcher: [] }],
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {state.tasks.map((task, index) => (
        <div
          key={`${task.label}-${index}`}
          className="flex flex-col gap-3 rounded-md border border-zinc-200 p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-700">
              {task.label || `Task ${index + 1}`}
            </span>
            <button
              type="button"
              onClick={() => removeTask(index)}
              aria-label={`Remove ${task.label || `task ${index + 1}`}`}
              className="text-xs text-zinc-400 transition-colors hover:text-red-500"
            >
              Remove
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="text-xs font-medium text-zinc-500"
              htmlFor={`task-label-${index}`}
            >
              Label
            </label>
            <input
              id={`task-label-${index}`}
              type="text"
              placeholder="e.g. build"
              value={task.label}
              onChange={(e) => updateTask(index, { label: e.target.value })}
              className="rounded border border-zinc-300 px-2 py-1 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="text-xs font-medium text-zinc-500"
              htmlFor={`task-command-${index}`}
            >
              Command
            </label>
            <input
              id={`task-command-${index}`}
              type="text"
              placeholder="e.g. npm run build"
              value={task.command}
              onChange={(e) => updateTask(index, { command: e.target.value })}
              className="rounded border border-zinc-300 px-2 py-1 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-1 flex-col gap-1">
              <label
                className="text-xs font-medium text-zinc-500"
                htmlFor={`task-group-${index}`}
              >
                Group
              </label>
              <select
                id={`task-group-${index}`}
                value={task.group}
                onChange={(e) => updateTask(index, { group: e.target.value })}
                className="rounded border border-zinc-300 px-2 py-1 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              >
                {TASK_GROUPS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <label
                className="text-xs font-medium text-zinc-500"
                htmlFor={`task-matcher-${index}`}
              >
                Problem matcher
              </label>
              <input
                id={`task-matcher-${index}`}
                type="text"
                placeholder="e.g. $tsc"
                value={task.problemMatcher.join(', ')}
                onChange={(e) =>
                  updateTask(index, {
                    problemMatcher: e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                className="rounded border border-zinc-300 px-2 py-1 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addTask}
        className="rounded-md border border-dashed border-zinc-300 py-2 text-sm text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-700"
      >
        + Add task
      </button>
    </div>
  );
};

export { VsCodeTasksForm };
