'use client';
import React from 'react';

import { useAtom } from 'jotai';
import { projectInfoAtom } from '@/lib/atoms';

const ProjectInfoForm = (): React.JSX.Element => {
  const [state, setState] = useAtom(projectInfoAtom);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700" htmlFor="project-name">
          Project name
        </label>
        <input
          id="project-name"
          type="text"
          placeholder="my-app"
          value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700" htmlFor="project-description">
          Short description
        </label>
        <input
          id="project-description"
          type="text"
          placeholder="A brief one-line description of your project"
          value={state.description}
          onChange={(e) => setState({ ...state, description: e.target.value })}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700" htmlFor="project-overview">
          Overview paragraph
        </label>
        <textarea
          id="project-overview"
          rows={4}
          placeholder="Describe what the project does, who it's for, and its key capabilities..."
          value={state.overview}
          onChange={(e) => setState({ ...state, overview: e.target.value })}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700" htmlFor="bootstrap-steps">
          Bootstrap sequence{' '}
          <span className="font-normal text-zinc-400">(optional)</span>
        </label>
        <textarea
          id="bootstrap-steps"
          rows={4}
          placeholder={`Ordered steps to scaffold a fresh project, e.g.:\n1. npx create-next-app@latest\n2. Define domain types in src/types/\n3. Scaffold feature folders`}
          value={state.bootstrapSteps}
          onChange={(e) => setState({ ...state, bootstrapSteps: e.target.value })}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>
    </div>
  );
};

export { ProjectInfoForm };
