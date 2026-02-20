const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
  const url = `${apiUrl}/${endpoint}`;

  try {
    const res = await fetch(url, options);

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
