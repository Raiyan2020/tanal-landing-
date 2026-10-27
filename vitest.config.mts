import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Unit tests for the modules under `lib/`, plus pages and components rendered to
// static markup with React's server renderer. Node environment only: there is no
// DOM or browser here, and nothing in `tests/` is imported by the app, so none of
// it reaches the Next.js bundle.
export default defineConfig({
  resolve: {
    // Mirrors the `@/*` path in tsconfig.json.
    alias: [{ find: /^@\//, replacement: fileURLToPath(new URL("./", import.meta.url)) }],
  },
  // tsconfig.json keeps `jsx: preserve` for Next; tests need it compiled.
  oxc: { jsx: { runtime: "automatic" } },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    setupFiles: ["tests/setup.ts"],
    // An empty run is a misconfiguration, not a pass.
    passWithNoTests: false,
    restoreMocks: true,
    unstubGlobals: true,
    unstubEnvs: true,
  },
});
