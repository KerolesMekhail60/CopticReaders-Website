import { z } from 'zod';

const apiUrl = import.meta.env.VITE_BASE_URL;

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
export async function getAllData(endpoint: string, options: any = {}) {
  const res = await fetch(`${apiUrl}/${endpoint}`, options);

  if (!res.ok)
    throw new Error(
      `Failed to retrieve data from ${endpoint}, status code: ${res.status}`,
    );

  const data = await res.json();

  if (data?.isError) {
    throw new Error(data?.message);
  }

  return data;
}

export async function getAllDataParallel(
  endpoints: string[],
  options: any = {},
) {
  const res = await Promise.all(
    endpoints.map((endpoint) => getAllData(endpoint, options)),
  );

  return res;
}

export async function postData(endpoint: string, options: any = {}) {
  const res = await fetch(`${apiUrl}/${endpoint}`, options);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  if (data?.isError) {
    throw new Error(data?.message);
  }

  return data;
}

export function slugify(text: string) {
  return (
    text
      .toString() // Ensure it's a string
      .toLowerCase() // Convert to lowercase
      .trim() // Trim whitespace
      .replace(/\s+/g, '-') // Replace spaces with dashes
      // eslint-disable-next-line no-useless-escape
      .replace(/[^\w\-]+/g, '') // Remove non-word
      // eslint-disable-next-line no-useless-escape
      .replace(/\-\-+/g, '-') // Replace multiple dashes with a single one
  );
}

//? regex
export const passwordSchema = z
  .string({
    required_error: 'Password can not be empty.',
  })
  .regex(/^.{8,20}$/, {
    message: 'Minimum 8 and maximum 20 characters.',
  })
  .regex(/(?=.*[A-Z])/, {
    message: 'At least one uppercase character.',
  })
  .regex(/(?=.*[a-z])/, {
    message: 'At least one lowercase character.',
  })
  .regex(/(?=.*\d)/, {
    message: 'At least one digit.',
  })
  .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
    message: 'At least one special character.',
  });
