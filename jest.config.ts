import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  // Default to jsdom for component tests; pure utility tests can override
  // with /** @jest-environment node */ docblock at the top of the file.
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
};

export default config;
