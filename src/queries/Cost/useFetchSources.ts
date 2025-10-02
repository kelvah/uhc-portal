import { useQuery } from '@tanstack/react-query';

import { costService } from '~/services';

import { formatErrorData } from '../helpers';

import { costKeys } from './costKeys';

export const useFetchSources = (
  baseKey: string,
  params?: Parameters<typeof costService.getSources>[0],
) => {
  const { data, isError, error, dataUpdatedAt, isLoading, status } = useQuery({
    queryKey: costKeys.sources(baseKey, params),
    queryFn: () => costService.getSources(params),
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
