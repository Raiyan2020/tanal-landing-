import { beforeEach, describe, expect, it, vi } from 'vitest';

// The base URL is fixed per test file so request URLs are predictable. Nothing
// leaves the process: `fetch` is stubbed in every test that reaches it.
const BASE = 'http://api.test/api/v1';

type Call = [string, RequestInit & { next?: { revalidate?: number } }];

const respond = (body: unknown, init?: ResponseInit) =>
  vi.fn(async () => new Response(body === undefined ? '' : JSON.stringify(body), init));

const envelope = (data: unknown) => ({
  key: 'success', msg: '', code: 200, response_status: { error: false, validation_errors: [] }, data,
});

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', BASE);
});

describe('site endpoints', () => {
  it('fetches /site with the language headers and the 60s revalidation, returning data', async () => {
    const fetchMock = respond(envelope({ hero: { title: 'Tanal' } }));
    vi.stubGlobal('fetch', fetchMock);
    const { fetchSiteData } = await import('@/lib/api');

    await expect(fetchSiteData('ar')).resolves.toEqual({ hero: { title: 'Tanal' } });

    const [url, init] = fetchMock.mock.calls[0] as unknown as Call;
    expect(url).toBe(`${BASE}/site`);
    expect(init.method).toBe('GET');
    expect(init.headers).toMatchObject({ Accept: 'application/json', 'Accept-Language': 'ar', lang: 'ar' });
    expect(init.next).toEqual({ revalidate: 60 });
  });

  it.each([
    ['fetchAbout', '/site/about'],
    ['fetchPrivacy', '/site/privacy'],
    ['fetchTerms', '/site/terms'],
  ] as const)('%s calls %s with a 1h revalidation', async (fn, path) => {
    const fetchMock = respond(envelope({ content: '<p>x</p>' }));
    vi.stubGlobal('fetch', fetchMock);
    const api = await import('@/lib/api');

    await expect(api[fn]('en')).resolves.toEqual({ content: '<p>x</p>' });
    const [url, init] = fetchMock.mock.calls[0] as unknown as Call;
    expect(url).toBe(`${BASE}${path}`);
    expect(init.next).toEqual({ revalidate: 3600 });
  });

  it('normalises a null event-type list to []', async () => {
    vi.stubGlobal('fetch', respond(envelope(null)));
    const { fetchEventTypes } = await import('@/lib/api');
    await expect(fetchEventTypes('ar')).resolves.toEqual([]);

    vi.stubGlobal('fetch', respond(envelope([{ id: 1, name: 'Wedding' }])));
    await expect(fetchEventTypes('en')).resolves.toEqual([{ id: 1, name: 'Wedding' }]);
  });
});

describe('request helper', () => {
  it('reports the status and endpoint on an HTTP error', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('Server Error', { status: 500 })));
    const { fetchSiteData } = await import('@/lib/api');
    await expect(fetchSiteData('ar')).rejects.toThrow('API error 500 on /site: Server Error');
  });

  it('treats an empty body as an empty object', async () => {
    vi.stubGlobal('fetch', respond(undefined));
    const { api } = await import('@/lib/api');
    await expect(api.get('/site/ping')).resolves.toEqual({});
  });

  it('sends JSON bodies as JSON and lets the browser set the FormData boundary', async () => {
    const fetchMock = respond(envelope(null));
    vi.stubGlobal('fetch', fetchMock);
    const { api } = await import('@/lib/api');

    await api.post('/x', { a: 1 });
    const [, jsonInit] = fetchMock.mock.calls[0] as unknown as Call;
    expect(jsonInit.body).toBe('{"a":1}');
    expect(jsonInit.headers).toMatchObject({ 'Content-Type': 'application/json' });

    const form = new FormData();
    form.append('file', 'x');
    await api.post('/y', form);
    const [, formInit] = fetchMock.mock.calls[1] as unknown as Call;
    expect(formInit.body).toBe(form);
    expect(formInit.headers).not.toHaveProperty('Content-Type');
  });

  it('omits the language headers when no language is given', async () => {
    const fetchMock = respond(envelope(null));
    vi.stubGlobal('fetch', fetchMock);
    const { api } = await import('@/lib/api');
    await api.get('/x');
    const [, init] = fetchMock.mock.calls[0] as unknown as Call;
    expect(init.headers).not.toHaveProperty('Accept-Language');
    expect(init.headers).not.toHaveProperty('lang');
  });
});
