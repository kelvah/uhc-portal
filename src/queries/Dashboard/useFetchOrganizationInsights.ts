import { useQuery } from '@tanstack/react-query';

import { insightsService } from '~/services';

import { formatErrorData } from '../helpers';

import { dashboardKeys } from './dashboardKeys';

export const useFetchOrganizationInsights = (baseKey: string) => {
  const { data, isError, error, dataUpdatedAt, isLoading, status } = useQuery({
    queryKey: dashboardKeys.organizationInsights(baseKey),
    queryFn: () => insightsService.getOrganizationInsights(),
    retry: false,
  });

  const errorData = formatErrorData(isLoading, isError, error);

  return {
    data: data?.data.overview,
    error: errorData?.error,
    dataUpdatedAt,
    status,
  };
};
