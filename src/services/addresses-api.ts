import type {
  Area,
  City,
  Country,
  PaginatedAddressResponse,
  PaginatedChurchResponse,
} from '@/types';

import { getAllData } from '@/utils/api';

export async function getCountriesApi(
  lang: string,
  pageNumber: number = 1,
  pageSize: number = 1000000,
) {
  const res = await getAllData(
    `Addresses/countries?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': lang,
      },
    },
  );

  return res.result as PaginatedAddressResponse<Country>;
}
export async function getCitiesApi(
  lang: string,
  pageNumber: number = 1,
  pageSize: number = 1000000,
) {
  const res = await getAllData(
    `Addresses/cities?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': lang,
      },
    },
  );

  return res.result as PaginatedAddressResponse<City>;
}

export async function getCitiesByCountryIdApi(
  countryId: string,
  lang: string,
  pageNumber: number = 1,
  pageSize: number = 1000000,
) {
  const res = await getAllData(
    `Addresses/countries/cities?countryId=${countryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': lang,
      },
    },
  );

  return res.result as PaginatedAddressResponse<City>;
}

export async function getAreasByCityIdApi(
  cityId: string,
  lang: string,
  pageNumber: number = 1,
  pageSize: number = 1000000,
) {
  const res = await getAllData(
    `Addresses/cities/areas?cityId=${cityId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': lang,
      },
    },
  );

  return res.result as PaginatedAddressResponse<Area>;
}

export async function getChurchesApi(lang: string) {
  const res = await getAllData('Churches', {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': lang,
    },
  });

  return res.result as PaginatedChurchResponse;
}

export async function getChurchesByAreaIdApi(
  areaId: string,
  lang: string,
  pageNumber: number = 1,
  pageSize: number = 10000,
) {
  const res = await getAllData(
    `Churches/area/${areaId}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': lang,
      },
    },
  );

  return res.result as PaginatedChurchResponse;
}
