import { useQuery } from '@tanstack/react-query';

import { costService } from '~/services';

import { formatErrorData } from '../helpers';

import { costKeys } from './costKeys';

export const useFetchUserAccess = (
  baseKey: string,
  params?: Parameters<typeof costService.getUserAccess>[0],
) => {
  const { data, isError, error, dataUpdatedAt, isLoading, status } = useQuery({
    queryKey: costKeys.access(baseKey, params),
    queryFn: () => costService.getUserAccess(params),
    retry: false,
  });

  const errorData = formatErrorData(isLoading, isError, error);

  return {
    data: data?.data,
    error: errorData?.error,
    dataUpdatedAt,
    status,
  };
};
