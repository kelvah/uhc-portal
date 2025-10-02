import { IActions } from '@patternfly/react-table';

import { hasCpuAndMemory } from '~/components/clusters/ClusterDetailsMultiRegion/clusterDetailsHelper';
import {
  hasResourceUsageMetrics,
  resourceUsageIssuesHelper,
  thresholds,
} from '~/components/clusters/ClusterDetailsMultiRegion/components/Monitoring/monitoringHelper';
import { ClusterFromSubscription } from '~/types/types';

const actionResolver = (cluster: ClusterFromSubscription | undefined): IActions => {
  const baseProps = {
    title: 'Open console',
    key: `${cluster?.id}.menu.adminconsole`,
  };

  const consoleURL = (cluster as any)?.console_url;

  return consoleURL
    ? [
        {
          ...baseProps,
          to: consoleURL,
          isExternalLink: true,
          rel: 'noopener noreferrer',
        },
      ]
    : [
        {
          ...baseProps,
          component: 'button',
          isAriaDisabled: true,
          tooltipProps: {
            content: 'Admin console is not yet available for this cluster',
          },
        },
      ];
};

const getIssuesCount = (cluster: ClusterFromSubscription) => {
  const metrics = cluster.metrics ?? undefined;
  if (!metrics) {
    return 0;
  }

  const { cpu, memory } = metrics;
  // For each entity, check if there is data available
  const clustersAlertsFiringCritical = metrics.critical_alerts_firing ?? 0;
  const clusterOperatorsConditionFailing = metrics.operators_condition_failing ?? 0;

  const hasResourceUsageData =
    cluster && hasCpuAndMemory(cpu, memory) && hasResourceUsageMetrics(cluster);
  const resourceUsageIssues = hasResourceUsageData
    ? resourceUsageIssuesHelper(cpu, memory, thresholds.DANGER)
    : 0;

  // Sum all issues
  return (
    clustersAlertsFiringCritical + (resourceUsageIssues ?? 0) + clusterOperatorsConditionFailing
  );
};

export { actionResolver, getIssuesCount };
