/**
 * Tanal API Client
 *
 * All HTTP calls to the backend go through this module.
 * Base URL  → resolved in `lib/api-config.ts` from NEXT_PUBLIC_API_BASE_URL,
 *             defaulting to https://portal.tanalevents.com/api/v1. Absolute on
 *             the server, same-origin `/api/v1` in the browser (proxied by the
 *             rewrite in `next.config.ts`).
 * Language  → passed per-call via the `Accept-Language` header so every
 *             endpoint automatically returns localised content.
 */

import type {
  ApiResponse,
  SiteData,
  EventType,
  ServiceRequestPayload,
  ServiceRequestResponse,
  AboutData,
  PrivacyData,
  TermsData,
} from "./types";

import { resolveApiBase } from "./api-config";

export {
  API_BASE_URL as API_ABSOLUTE_BASE_URL,
  API_ORIGIN,
  BROWSER_API_BASE_PATH,
} from "./api-config";

/**
 * Kept as a named export for existing callers. It is the base for the runtime
 * this module was bundled for — relative in the browser, absolute on the server.
 */
export const API_BASE_URL = resolveApiBase();

// ─── Generic request helper ──────────────────────────────────────────────────

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: Record<string, unknown> | FormData;
  /** BCP-47 language tag sent as Accept-Language, e.g. "ar" or "en" */
  lang?: string;
  /** Next.js fetch cache options (revalidate, tags, etc.) */
  next?: NextFetchRequestConfig;
};

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, headers, lang, ...rest } = options;

  const isFormData = body instanceof FormData;

  const response = await fetch(`${resolveApiBase()}${endpoint}`, {
    ...rest,
    ...(options.next && { next: options.next }),
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      Accept: "application/json",
      ...(lang && { "Accept-Language": lang }),
      ...(lang && { "lang": lang }),
      ...headers,
    },
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(
      `API error ${response.status} on ${endpoint}: ${errorText}`
    );
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}

// ─── Convenience methods ──────────────────────────────────────────────────────

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { method: "GET", ...options }),

  post: <T>(
    endpoint: string,
    body: Record<string, unknown> | FormData,
    options?: RequestOptions
  ) => request<T>(endpoint, { method: "POST", body, ...options }),

  put: <T>(
    endpoint: string,
    body: Record<string, unknown> | FormData,
    options?: RequestOptions
  ) => request<T>(endpoint, { method: "PUT", body, ...options }),

  patch: <T>(
    endpoint: string,
    body: Record<string, unknown>,
    options?: RequestOptions
  ) => request<T>(endpoint, { method: "PATCH", body, ...options }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { method: "DELETE", ...options }),
};

// ─── Site endpoints ───────────────────────────────────────────────────────────

/** GET /site  — full landing page data (revalidated every 60s) */
export const fetchSiteData = (lang: string) =>
  api
    .get<ApiResponse<SiteData>>("/site", { lang, next: { revalidate: 60 } } as RequestOptions)
    .then((res) => res.data);

/** GET /site/about */
export const fetchAbout = (lang: string) =>
  api
    .get<ApiResponse<AboutData>>("/site/about", { lang, next: { revalidate: 3600 } } as RequestOptions)
    .then((res) => res.data);

/** GET /site/privacy */
export const fetchPrivacy = (lang: string) =>
  api
    .get<ApiResponse<PrivacyData>>("/site/privacy", { lang, next: { revalidate: 3600 } } as RequestOptions)
    .then((res) => res.data);

/** GET /site/terms */
export const fetchTerms = (lang: string) =>
  api
    .get<ApiResponse<TermsData>>("/site/terms", { lang, next: { revalidate: 3600 } } as RequestOptions)
    .then((res) => res.data);

/**
 * GET /site/event-types (revalidated every 5 minutes)
 *
 * The endpoint replies with `"data": null` — not an empty array — when no event
 * types are configured, so the result is normalised to `[]` here and callers can
 * always map over it.
 */
export const fetchEventTypes = (lang: string) =>
  api
    .get<ApiResponse<EventType[] | null>>("/site/event-types", { lang, next: { revalidate: 300 } } as RequestOptions)
    .then((res) => res.data ?? []);

/** POST /site/service-requests */
export const submitServiceRequest = (
  payload: ServiceRequestPayload,
  lang: string
) =>
  api.post<ApiResponse<ServiceRequestResponse>>(
    "/site/service-requests",
    payload as unknown as Record<string, unknown>,
    { lang }
  );
