import { useQuery } from '@tanstack/react-query';

import { accountsService } from '~/services';

import { formatErrorData } from '../helpers';

import { dashboardKeys } from './accountKeys';

export const useFetchAccountOrganization = (baseKey: string) => {
  const { data, isError, error, dataUpdatedAt, isLoading, status } = useQuery({
    queryKey: dashboardKeys.organization(baseKey),
    queryFn: () =>
      accountsService
        .getCurrentAccount()
        .then((organizationResponse) => organizationResponse.data?.organization),
    retry: false,
    staleTime: Infinity,
  });

  const errorData = formatErrorData(isLoading, isError, error);

  return {
    data,
    error: errorData?.error,
    dataUpdatedAt,
    status,
  };
};
