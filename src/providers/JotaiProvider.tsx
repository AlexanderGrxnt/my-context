'use client';
import React from 'react';

import { Provider } from 'jotai';
import type { ReactNode } from 'react';

interface JotaiProviderProps {
  children: ReactNode;
}

/**
 * Client-side Jotai Provider wrapper for the application.
 * Must wrap any component tree that reads or writes Jotai atoms.
 */
const JotaiProvider = ({ children }: JotaiProviderProps): React.JSX.Element => {
  return <Provider>{children}</Provider>;
};

export { JotaiProvider };
