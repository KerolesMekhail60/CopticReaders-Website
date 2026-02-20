import { postData } from '@/utils/api';

export async function getAllDonationApi(lang: string) {
  const res = await postData(`Donations/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      language: lang,
    },
  });

  return res;
}
export async function getDonationByIdApi(id: string, lang: string) {
  const res = await postData(`Donations/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      language: lang,
    },
  });

  return res;
}
