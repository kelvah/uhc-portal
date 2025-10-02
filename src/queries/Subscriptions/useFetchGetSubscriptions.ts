import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { PaginationType } from '~/common/model/PaginationType';
import { queryClient } from '~/components/App/queryClient';
import { accountsService } from '~/services';

import { formatErrorData } from '../helpers';

import { subscriptionsKeys } from './subscriptionsKeys';

export const useFetchGetSubscriptions = (
  baseKey: string,
  params: Partial<Parameters<typeof accountsService.getSubscriptions>[0]>,
) => {
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    size: 5,
  });
  const queryParams = {
    ...params,
    page: pagination.page,
    page_size: pagination.size,
  };

  const { data, isError, error, dataUpdatedAt, isLoading, status } = useQuery({
    queryKey: subscriptionsKeys.get(baseKey, queryParams),
    queryFn: () => accountsService.getSubscriptions(queryParams).then((response) => response.data),
    retry: false,
  });

  const errorData = formatErrorData(isLoading, isError, error);

  return {
    data: data?.items,
    pagination: {
      page: data?.page ?? pagination.page,
      size: pagination.size,
      total: data?.total,
    },
    error: errorData?.error,
    dataUpdatedAt,
    status,
    updatePagination: setPagination,
  };
};

export const invalidateGetSubscriptions = (baseKey: string) =>
  queryClient.invalidateQueries({ queryKey: subscriptionsKeys.get(baseKey) });
