'use client';

import { useLocale } from 'next-intl';

import { useQuery } from '@tanstack/react-query';

import type {
  Area,
  City,
  Country,
  PaginatedAddressResponse,
  PaginatedChurchResponse,
} from '@/types';

import {
  getAreasByCityIdApi,
  getChurchesApi,
  getChurchesByAreaIdApi,
  getCitiesApi,
  getCitiesByCountryIdApi,
  getCountriesApi,
} from '@/services/addresses-api';

export function useCountries(
  pageNumber: number = 1,
  pageSize: number = 1000000,
) {
  const locale = useLocale();
  return useQuery<PaginatedAddressResponse<Country>, Error>({
    queryKey: ['countries', pageNumber, pageSize],
    queryFn: () => getCountriesApi(locale, pageNumber, pageSize),
  });
}

export function useCities(pageNumber: number = 1, pageSize: number = 100000) {
  const locale = useLocale();
  return useQuery<PaginatedAddressResponse<City>, Error>({
    queryKey: ['cities', pageNumber, pageSize],
    queryFn: () => getCitiesApi(locale, pageNumber, pageSize),
  });
}

export function useCitiesByCountry(
  countryId: string | null,
  pageNumber: number = 1,
  pageSize: number = 100000,
) {
  const locale = useLocale();
  return useQuery<PaginatedAddressResponse<City>, Error>({
    queryKey: ['cities', 'by-country', countryId, pageNumber, pageSize],
    queryFn: () =>
      getCitiesByCountryIdApi(countryId!, locale, pageNumber, pageSize),
    enabled: !!countryId,
  });
}

export function useAreasByCity(
  cityId: string | null,
  pageNumber: number = 1,
  pageSize: number = 100000,
) {
  const locale = useLocale();
  return useQuery<PaginatedAddressResponse<Area>, Error>({
    queryKey: ['areas', cityId, pageNumber, pageSize],
    queryFn: () => getAreasByCityIdApi(cityId!, locale, pageNumber, pageSize),
    enabled: !!cityId,
  });
}

export function useChurches() {
  const locale = useLocale();
  return useQuery<PaginatedChurchResponse, Error>({
    queryKey: ['churches'],
    queryFn: () => getChurchesApi(locale),
  });
}

export function useChurchesByArea(
  areaId: string | null,
  pageNumber: number = 1,
  pageSize: number = 10000,
) {
  const locale = useLocale();
  return useQuery<PaginatedChurchResponse, Error>({
    queryKey: ['churches', areaId, pageNumber, pageSize],
    queryFn: () =>
      getChurchesByAreaIdApi(areaId!, locale, pageNumber, pageSize),
    enabled: !!areaId,
  });
}
