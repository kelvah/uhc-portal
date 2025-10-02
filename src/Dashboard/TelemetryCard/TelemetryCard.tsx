import React from 'react';

import { Card, CardBody, CardTitle, EmptyState, EmptyStateBody } from '@patternfly/react-core';
import { QueryStatus } from '@tanstack/react-query';

import SmallClusterChart from '~/components/clusters/common/ResourceUsage/SmallClusterChart';

import { DashboardCardError } from '../common/DashboardCardError';

import { TelemetryCardSkeleton } from './components/TelemetryCardSkeleton';

type TelemetryCardProps = {
  totalClusters: number;
  totalConnectedClusters: number;
  status: QueryStatus;
};

const TelemetryCard = ({ totalClusters, totalConnectedClusters, status }: TelemetryCardProps) => (
  <Card isFullHeight>
    <CardTitle>Telemetry</CardTitle>
    <CardBody>
      {(() => {
        switch (true) {
          case status === 'pending':
            return <TelemetryCardSkeleton />;
          case status === 'error':
            return <DashboardCardError />;
          case status === 'success' &&
            totalClusters !== undefined &&
            totalConnectedClusters !== undefined:
            return (
              <SmallClusterChart
                donutId="connected_clusters_donut"
                used={totalConnectedClusters}
                total={totalClusters}
                availableTitle="Not checking in"
                usedTitle="Connected"
                unitLabel="clusters"
              />
            );
          default:
            return (
              <EmptyState>
                <EmptyStateBody>No data available</EmptyStateBody>
              </EmptyState>
            );
        }
      })()}
    </CardBody>
  </Card>
);

export { TelemetryCard };
