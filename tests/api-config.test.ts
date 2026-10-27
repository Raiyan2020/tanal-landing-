import { beforeEach, describe, expect, it, vi } from 'vitest';

// `lib/api-config.ts` reads NEXT_PUBLIC_API_BASE_URL when it is first imported,
// so each case stubs the variable and imports a fresh copy of the module.
const load = () => import('@/lib/api-config');

beforeEach(() => {
  vi.resetModules();
});

describe('API base resolution', () => {
  it('falls back to the default when the variable is unset or blank', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', '   ');
    const config = await load();
    expect(config.API_BASE_URL).toBe(config.DEFAULT_API_BASE_URL);
  });

  it('strips trailing slashes and derives origin, protocol and host', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', 'http://localhost:8000/api/v1///');
    const config = await load();
    expect(config.API_BASE_URL).toBe('http://localhost:8000/api/v1');
    expect(config.API_ORIGIN).toBe('http://localhost:8000');
    expect(config.API_PROTOCOL).toBe('http');
    expect(config.API_HOSTNAME).toBe('localhost');
  });

  it('refuses a malformed value instead of silently using production', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', 'not a url');
    await expect(load()).rejects.toThrow(/not a valid absolute URL/);
  });

  it('is absolute on the server and the same-origin proxy path in the browser', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', 'http://localhost:8000/api/v1');
    const config = await load();
    expect(config.resolveApiBase()).toBe('http://localhost:8000/api/v1');

    vi.stubGlobal('window', {});
    expect(config.resolveApiBase()).toBe(config.BROWSER_API_BASE_PATH);
    expect(config.BROWSER_API_BASE_PATH).toBe('/api/v1');
  });
});
