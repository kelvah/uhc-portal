import React from 'react';

import { Card, CardBody, CardTitle } from '@patternfly/react-core';
import { QueryStatus } from '@tanstack/react-query';

import SmallClusterChart from '~/components/clusters/common/ResourceUsage/SmallClusterChart';

import { DashboardCardError } from '../common/DashboardCardError';

import { UpdateStatusCardSkeleton } from './components/UpdateStatusCardSkeleton';

type UpdateStatusCardProps = {
  upToDateNumberOfClusters: number;
  updatableNumberOfClusters: number;
  status: QueryStatus;
};

const UpdateStatusCard = ({
  upToDateNumberOfClusters,
  updatableNumberOfClusters,
  status,
}: UpdateStatusCardProps) => (
  <Card isFullHeight>
    <CardTitle>Update status</CardTitle>
    <CardBody>
      {(() => {
        switch (status) {
          case 'pending':
            return <UpdateStatusCardSkeleton />;
          case 'error':
            return <DashboardCardError />;
          default:
            return (
              <SmallClusterChart
                donutId="update_available_donut"
                used={upToDateNumberOfClusters}
                total={updatableNumberOfClusters + upToDateNumberOfClusters}
                unitLabel="clusters"
                availableTitle="Update available"
                usedTitle="Up-to-date"
              />
            );
        }
      })()}
    </CardBody>
  </Card>
);

export { UpdateStatusCard };
