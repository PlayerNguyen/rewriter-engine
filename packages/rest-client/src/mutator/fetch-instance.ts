export type RequestParams = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, unknown>;
  signal?: AbortSignal;
};

export const customFetchInstance = async <T>(requestParams: RequestParams): Promise<T> => {
  const baseURL = process.env.API_URL ?? 'http://localhost:3001';

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
