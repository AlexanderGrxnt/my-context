'use client';
import React from 'react';

import { useAtom } from 'jotai';
import { architectureAtom } from '@/lib/atoms';
import type { RouteEntry, DomainTypeEntry } from '@/lib/atoms';

const ArchitectureForm = (): React.JSX.Element => {
  const [state, setState] = useAtom(architectureAtom);

  const addRoute = (): void => {
    setState({ ...state, routes: [...state.routes, { path: '', description: '' }] });
  };

  const updateRoute = (index: number, field: keyof RouteEntry, value: string): void => {
    const updated = state.routes.map((r, i) => (i === index ? { ...r, [field]: value } : r));
    setState({ ...state, routes: updated });
  };

  const removeRoute = (index: number): void => {
    setState({ ...state, routes: state.routes.filter((_, i) => i !== index) });
  };

  const addDomainType = (): void => {
    setState({ ...state, domainTypes: [...state.domainTypes, { name: '', description: '' }] });
  };

  const updateDomainType = (index: number, field: keyof DomainTypeEntry, value: string): void => {
    const updated = state.domainTypes.map((t, i) => (i === index ? { ...t, [field]: value } : t));
    setState({ ...state, domainTypes: updated });
  };

  const removeDomainType = (index: number): void => {
    setState({ ...state, domainTypes: state.domainTypes.filter((_, i) => i !== index) });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Routes */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-zinc-700">Routes</p>
          <button
            type="button"
            onClick={addRoute}
            className="rounded-md bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-200"
          >
            + Add route
          </button>
        </div>
        {state.routes.length === 0 && (
          <p className="text-sm italic text-zinc-400">No routes added yet</p>
        )}
        {state.routes.map((route, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="/path"
              value={route.path}
              onChange={(e) => updateRoute(index, 'path', e.target.value)}
              className="w-1/3 rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
            <input
              type="text"
              placeholder="Description"
              value={route.description}
              onChange={(e) => updateRoute(index, 'description', e.target.value)}
              className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
            <button
              type="button"
              onClick={() => removeRoute(index)}
              className="shrink-0 rounded-md p-2 text-zinc-400 hover:text-zinc-700"
              aria-label="Remove route"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Domain types */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-zinc-700">Domain types</p>
          <button
            type="button"
            onClick={addDomainType}
            className="rounded-md bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-200"
          >
            + Add type
          </button>
        </div>
        {state.domainTypes.length === 0 && (
          <p className="text-sm italic text-zinc-400">No domain types added yet</p>
        )}
        {state.domainTypes.map((type, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="TypeName"
              value={type.name}
              onChange={(e) => updateDomainType(index, 'name', e.target.value)}
              className="w-1/3 rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
            <input
              type="text"
              placeholder="Description"
              value={type.description}
              onChange={(e) => updateDomainType(index, 'description', e.target.value)}
              className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
            <button
              type="button"
              onClick={() => removeDomainType(index)}
              className="shrink-0 rounded-md p-2 text-zinc-400 hover:text-zinc-700"
              aria-label="Remove type"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Component hierarchy */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700" htmlFor="component-hierarchy">
          Component hierarchy{' '}
          <span className="font-normal text-zinc-400">(optional)</span>
        </label>
        <textarea
          id="component-hierarchy"
          rows={5}
          placeholder={'<RootLayout>\n  <Nav />\n  <DashboardPage>\n    <FormPanel />\n    <PreviewPanel />'}
          value={state.componentHierarchy}
          onChange={(e) => setState({ ...state, componentHierarchy: e.target.value })}
          className="rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>
    </div>
  );
};

export { ArchitectureForm };
