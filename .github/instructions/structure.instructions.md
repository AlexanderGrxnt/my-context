---
applyTo: "**"
---

## Folder Structure Conventions

src
|
+-- actions           # global Next.js server actions
+-- app               # Next.js routing folder
+-- assets            # static files such as images, fonts, etc.
+-- components        # shared components used across the entire application
+-- config            # global configuration and env variables
+-- features          # feature-based modules
+-- hooks             # shared hooks used across the entire application
+-- lib               # libraries preconfigured for the application
+-- providers         # all application providers
+-- states            # global state stores
+-- test              # test utilities and mock server
+-- types             # base types used across the application
+-- utils             # shared utility functions

## Feature Module Structure

Each feature under `src/features/<feature-name>/` may contain:

+-- api         # API request declarations and hooks for the feature
+-- actions     # Next.js server actions
+-- assets      # static files scoped to the feature
+-- components  # components scoped to the feature
+-- hooks       # hooks scoped to the feature
+-- states      # state stores for the feature
+-- types       # TypeScript types for the feature domain
+-- utils       # utility functions for the feature
+-- index.ts    # public API — export everything consumed outside the feature
