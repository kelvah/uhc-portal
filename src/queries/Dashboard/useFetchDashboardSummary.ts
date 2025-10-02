import { useQuery } from '@tanstack/react-query';

import { accountManager } from '~/services';
import { ClusterResource, Summary, SummaryMetrics } from '~/types/accounts_mgmt.v1';

import { formatErrorData } from '../helpers';

import { dashboardKeys } from './dashboardKeys';

type DashboardResponse = { [index: string]: ClusterResource['total'] | ClusterResource['used'] };

type DashboardSummary = {
  totalClusters: ClusterResource['total'];
  totalConnectedClusters: ClusterResource['total'];
  totalUnhealthyClusters: ClusterResource['total'];
  totalCPU: ClusterResource['total'];
  totalMem: ClusterResource['total'];
  usedCPU: ClusterResource['used'];
  usedMem: ClusterResource['used'];
  upToDateNumberOfClusters: ClusterResource['total'];
  updatableNumberOfClusters: ClusterResource['total'];
};

const emptyClusterResource = {
  value: 0,
  unit: 'B',
};

const dashboardResponseToDashboardSummary = (data: DashboardResponse): DashboardSummary => ({
  totalClusters: data.clusters_total ?? emptyClusterResource,
  totalConnectedClusters: data.connected_clusters_total ?? emptyClusterResource,
  totalUnhealthyClusters: data.unhealthy_clusters_total ?? emptyClusterResource,
  totalCPU: data.sum_total_cpu ?? emptyClusterResource,
  totalMem: data.sum_total_memory ?? emptyClusterResource,
  usedCPU: data.sum_used_cpu ?? emptyClusterResource,
  usedMem: data.sum_used_memory ?? emptyClusterResource,
  upToDateNumberOfClusters: data.clusters_up_to_date_total ?? emptyClusterResource,
  updatableNumberOfClusters: data.clusters_upgrade_available_total ?? emptyClusterResource,
});

const selectDashboardSummary = (summary: Summary): DashboardSummary =>
  summary.name
    ? dashboardResponseToDashboardSummary(
        summary.metrics
          .filter((metric) => metric.name)
          .reduce(
            (acc: DashboardResponse, metric: SummaryMetrics) => ({
              ...acc,
              [metric.name!]: {
                value: metric.vector?.[0].value ?? 0,
                unit: 'B',
              },
            }),
            {},
          ),
      )
    : ({} as DashboardSummary);

export const useFetchDashboardSummary = (baseKey: string, organizationId: string | undefined) => {
  const { data, error, dataUpdatedAt, status, isLoading, isError } = useQuery({
    enabled: organizationId !== undefined,
    queryKey: dashboardKeys.summary(baseKey, organizationId!),
    queryFn: () =>
      accountManager
        .getDashboard(organizationId!)
        .then((dashboardResponse) => dashboardResponse.data),
    select: selectDashboardSummary,
    retry: false,
  });

  const errorData = formatErrorData(isLoading, isError, error);

  return {
    data: data ?? ({} as DashboardSummary),
    error: errorData?.error,
    dataUpdatedAt,
    status,
  };
};
