import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { PaginationType } from '~/common/model/PaginationType';
import { accountsService } from '~/services';
import { SubscriptionList } from '~/types/accounts_mgmt.v1';
import { ClusterFromSubscription } from '~/types/types';

import { formatErrorData } from '../helpers';

import { dashboardKeys } from './dashboardKeys';

const select = (response: SubscriptionList) => ({
  ...response,
  items: response.items?.map(
    (item) => ({ ...item, metrics: item.metrics?.[0] ?? {} }) as ClusterFromSubscription,
  ),
});

export const useFetchUnhealthyClusters = (
  baseKey: string,
  organizationId: string,
  params: Partial<Parameters<typeof accountsService.getUnhealthyClusters>[1]>,
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
    enabled: organizationId !== undefined,
    queryKey: dashboardKeys.unhealthyClusters(baseKey, organizationId, queryParams),
    queryFn: () =>
      accountsService
        .getUnhealthyClusters(organizationId, queryParams)
        .then((response) => response.data),
    select,
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
