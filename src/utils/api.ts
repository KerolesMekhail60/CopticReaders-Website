const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const PUBLIC_REVALIDATE_SECONDS = 300;

function hasAuthorizationHeader(headers?: HeadersInit) {
  if (!headers) return false;

  if (headers instanceof Headers) {
    return headers.has('authorization') || headers.has('Authorization');
  }

  if (Array.isArray(headers)) {
    return headers.some(
      ([key]) => key.toLowerCase() === 'authorization',
    );
  }

  return Object.keys(headers).some(
    (key) => key.toLowerCase() === 'authorization',
  );
}

function withSmartCache(options: RequestInit = {}): RequestInit {
  const method = (options.method || 'GET').toUpperCase();
  const hasAuth = hasAuthorizationHeader(options.headers);

  if (method === 'GET' && !hasAuth) {
    const nextOptions = (options as RequestInit & {
      next?: { revalidate?: number | false; tags?: string[] };
    }).next;

    return {
      ...options,
      next: {
        ...nextOptions,
        revalidate: nextOptions?.revalidate ?? PUBLIC_REVALIDATE_SECONDS,
      },
    };
  }

  return {
    ...options,
    cache: 'no-store',
  };
}

export function updateSearchParams(key: string, value: string) {
  const searchParams = new URLSearchParams(location.search);

  searchParams.set(key, value);

  const newPathname = `${location.pathname}?${searchParams.toString()}`;

  return newPathname;
}

export function deleteSearchParams(paramName: string, paramValue: string) {
  const searchParams = new URLSearchParams(window.location.search);

  const values = searchParams.getAll(paramName);

  const updatedValues = values.filter((value) => value !== paramValue);

  if (updatedValues.length > 0) {
    searchParams.set(paramName, updatedValues.join(','));
  } else {
    searchParams.delete(paramName);
  }

  return `?${searchParams.toString()}`;
}
//? API
export async function getAllData(endpoint: string, options: RequestInit = {}) {
  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured');
  }

  const url = `${apiUrl}/${endpoint}`;
  const fetchOptions = withSmartCache(options);

  try {
    const res = await fetch(url, fetchOptions);

    if (!res.ok)
      throw new Error(
        `Failed to retrieve data from ${endpoint}, status code: ${res.status}`,
      );
    const data = await res.json();
    if (data?.isError) throw new Error(data?.message);
    return data;
  } catch (err) {
    console.error('❌ Fetch failed:', err);
    throw err;
  }
}

export async function getAllDataParallel(
  endpoints: string[],
  options: RequestInit = {},
) {
  const res = await Promise.all(
    endpoints.map((endpoint) => getAllData(endpoint, options)),
  );

  return res;
}

export async function postData(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${apiUrl}/${endpoint}`, options);

  // if (!res.ok) {
  //   throw new Error(`HTTP error! Status: ${res.status}`);
  // }

  const data = await res.json();
  if (data?.isError) {
    throw new Error(data?.message);
  }

  return data;
}
