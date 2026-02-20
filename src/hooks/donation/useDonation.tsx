import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getAllDonationApi, getDonationByIdApi } from '@/services/donation-api';

export function useDonation(lang: string) {
  const {
    data: allData,
    isLoading: isAllLoading,
    error: allError,
  } = useQuery({
    queryKey: ['donation'],
    queryFn: () => getAllDonationApi(lang),
    placeholderData: keepPreviousData,
  });

  const firstId = allData?.result?.[0]?.id;

  const {
    data: donationByIdData,
    isLoading: isDonationLoading,
    error: donationError,
  } = useQuery({
    queryKey: ['donation', firstId, lang],
    queryFn: () => getDonationByIdApi(firstId, lang),
    enabled: !!firstId,
  });

  return {
    isLoading: isAllLoading || isDonationLoading,
    selectedDonation: donationByIdData?.result,
    error: allError || donationError,
  };
}
