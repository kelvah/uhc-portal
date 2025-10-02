import { QueryObject } from '~/common/queryHelpers';

const dashboardKeys = {
  all: ['dashboard'] as const,
  summary: (baseKey: string, organizationId: string) =>
    [baseKey, ...dashboardKeys.all, 'summary', organizationId] as const,
  organizationInsights: (baseKey: string) =>
    [baseKey, ...dashboardKeys.all, 'organization', 'insights'] as const,
  unhealthyClusters: (baseKey: string, organizationId: string, params: QueryObject) =>
    [baseKey, ...dashboardKeys.all, 'unhealthyClusters', organizationId, { ...params }] as const,
};

export { dashboardKeys };
