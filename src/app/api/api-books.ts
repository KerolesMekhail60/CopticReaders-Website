// src/api/getCitiesApi.ts
import { getAllData } from '@/utils/api';

export async function getAllBooksApi(locale: string) {
  const res = await getAllData(`Books/paginated`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      language: locale,
    },
  });

  return res;
}
