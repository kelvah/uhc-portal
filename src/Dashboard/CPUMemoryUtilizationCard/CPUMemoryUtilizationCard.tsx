import React, { useMemo } from 'react';

import { Card, CardBody, CardTitle, EmptyState, EmptyStateBody } from '@patternfly/react-core';
import { QueryStatus } from '@tanstack/react-query';

import ResourceUsage from '~/components/clusters/common/ResourceUsage/ResourceUsage';
import { ClusterResource } from '~/types/accounts_mgmt.v1';

import { CPUMemoryUtilizationCardError } from './components/CPUMemoryUtilizationCardError';
import { CPUMemoryUtilizationCardSkeleton } from './components/CPUMemoryUtilizationCardSkeleton';

type CPUMemoryUtilizationCardProps = {
  totalConnectedClusters: ClusterResource['total'];
  totalCPU: ClusterResource['total'];
  totalMem: ClusterResource['total'];
  usedCPU: ClusterResource['used'];
  usedMem: ClusterResource['used'];
  status: QueryStatus;
};

const CPUMemoryUtilizationCard = ({
  totalConnectedClusters,
  totalCPU,
  totalMem,
  usedCPU,
  usedMem,
  status,
}: CPUMemoryUtilizationCardProps) => {
  const dataAvailable = useMemo(
    () =>
      status === 'success' &&
      (totalConnectedClusters.value ?? 0) > 0 &&
      ((totalCPU.value ?? 0) > 0 || (totalMem.value ?? 0) > 0),
    [status, totalCPU?.value, totalConnectedClusters?.value, totalMem?.value],
  );

  return (
    <Card isFullHeight className="ocm-c-metrics-charts__card">
      <CardTitle>CPU and Memory utilization</CardTitle>
      <CardBody>
        {(() => {
          switch (true) {
            case status === 'pending':
              return <CPUMemoryUtilizationCardSkeleton />;
            case status === 'error':
              return <CPUMemoryUtilizationCardError />;
            case dataAvailable:
              return (
                <ResourceUsage
                  cpu={{
                    total: totalCPU,
                    used: usedCPU,
                    updated_timestamp: '',
                  }}
                  memory={{
                    total: totalMem,
                    used: usedMem,
                    updated_timestamp: '',
                  }}
                  metricsAvailable
                  type="legend"
                />
              );
            default:
              return (
                <EmptyState titleText="No data available" headingLevel="h2">
                  <EmptyStateBody>
                    Check individual clusters web console if you expect that they should be sending
                    metrics. Note that data is not available for clusters that are installing.
                  </EmptyStateBody>
                </EmptyState>
              );
          }
        })()}
      </CardBody>
    </Card>
  );
};

export { CPUMemoryUtilizationCard };
