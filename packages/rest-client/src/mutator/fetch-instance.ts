/**
 * Parameters passed by Orval's generated fetch client to the custom mutator.
 * Matches the shape Orval emits when using `httpClient: 'fetch'`.
 *
 * @example
 * customFetchInstance<GetApiV1Health200>({
 *   url: '/api/v1/health',
 *   method: 'GET',
 * });
 *
 * @example
 * // With query parameters
 * customFetchInstance<GetApiV1Table200>({
 *   url: '/api/v1/table',
 *   method: 'GET',
 *   params: { id: 'sources', page: '1', limit: '20' },
 * });
 */
export type RequestParams = {
  /** API path relative to the base URL (e.g. `/api/v1/health`). */
  url: string;
  /** HTTP method. */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  /** Custom headers merged on top of defaults. */
  headers?: Record<string, string>;
  /** Request body (serialized to JSON before sending). */
  body?: unknown;
  /** Query parameters appended to the URL. */
  params?: Record<string, unknown>;
  /** AbortSignal for request cancellation. */
  signal?: AbortSignal;
};

/**
 * Custom fetch instance used by Orval-generated API functions.
 *
 * Resolves the base URL from environment variables (Vite `VITE_API_URL`
 * takes priority, then Node/Bun `API_URL`, then falls back to
 * `http://localhost:3001`). Injects an auth token from `localStorage`
 * when running in a browser. Normalises non-OK responses into a
 * thrown `{ status, body }` object.
 *
 * @typeParam T - The expected response shape.
 * @param requestParams - The request configuration from Orval's generated code.
 * @returns The parsed JSON response body cast to {@link T}.
 * @throws An object with `status` and `body` on non-2xx responses.
 *
 * @example
 * // Called automatically by generated code:
 * const data = await getApiV1Health();
 *
 * @example
 * // Override the base URL at runtime:
 * process.env.API_URL = 'https://staging.example.com';
 * const data = await getApiV1Health();
 */
export const customFetchInstance = async <T>(requestParams: RequestParams): Promise<T> => {
  const baseURL =
    (import.meta.env as Record<string, string> | undefined)?.VITE_API_URL ??
    process.env.API_URL ??
    'http://localhost:3001';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...requestParams.headers,
  };

  if (typeof document !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const url = new URL(`${baseURL}${requestParams.url}`);
  if (requestParams.params) {
    for (const [key, value] of Object.entries(requestParams.params)) {
      if (value != null) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const res = await fetch(url.toString(), {
    method: requestParams.method,
    headers,
    body: requestParams.body ? JSON.stringify(requestParams.body) : undefined,
    signal: requestParams.signal,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw { status: res.status, body: errorBody };
  }

  return res.json() as Promise<T>;
};
