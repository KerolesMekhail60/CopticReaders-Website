import { postData } from '@/utils/api';

/**
 * Add book to favorites
 * POST /api/UserBooks/favorite/{bookId}
 */
export async function addToFavoritesApi(bookId: string, token: string) {
  const res = await postData(`UserBooks/favorite/${bookId}`, {
    method: 'POST',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
}

/**
 * Remove book from favorites
 * DELETE /api/UserBooks/favorite/{bookId}
 */
export async function removeFromFavoritesApi(bookId: string, token: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/UserBooks/favorite/${bookId}`, {
    method: 'DELETE',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  if (data?.isError) {
    throw new Error(data?.message);
  }

  return data;
}
