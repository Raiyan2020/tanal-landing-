/**
 * Runs before every test file: replaces `fetch` with a guard that fails the
 * test. A test that needs a response stubs `fetch` itself (`vi.stubGlobal`), and
 * the guard comes back after it (`unstubGlobals` in vitest.config.mts).
 */
globalThis.fetch = (async (input: unknown) => {
  throw new Error(`Unexpected network request in a unit test: ${String(input)}`);
}) as typeof fetch;
