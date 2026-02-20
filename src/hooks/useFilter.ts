import { useTransition } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useForm } from 'react-hook-form';

import { FormFilterFields, QueryParams } from '@/types/global';

import { mapSearchParamsToDefaultValues } from '@/utils/search-params';

import { defaultValues } from '@/constents';

const useFilter = (searchParams?: QueryParams) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsFromUrl = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const defaultValuesFromSearchParams = searchParams
    ? mapSearchParamsToDefaultValues(searchParams)
    : undefined;

  const form = useForm<FormFilterFields>({
    defaultValues: defaultValuesFromSearchParams || defaultValues,
  });

  function handleFilteration() {
    const data = form.getValues();
    const { AuthorId, CategoryId, Search } = data;

    const params = new URLSearchParams(searchParamsFromUrl.toString());

    if (AuthorId) {
      params.set('AuthorId', AuthorId);
    } else {
      params.delete('AuthorId');
    }

    if (CategoryId) {
      params.set('CategoryIds', CategoryId);
    } else {
      params.delete('CategoryIds');
    }

    if (Search) {
      params.set('Search', Search);
    } else {
      params.delete('Search');
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function handleReset() {
    form.reset(defaultValues);

    const params = new URLSearchParams(searchParamsFromUrl.toString());
    params.delete('AuthorId');
    params.delete('CategoryIds');
    params.delete('Search');

    startTransition(() => {
      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.replace(newUrl, { scroll: false });
    });
  }

  return {
    form,
    handleFilteration,
    handleReset,
    isPending,
  };
};

export default useFilter;
