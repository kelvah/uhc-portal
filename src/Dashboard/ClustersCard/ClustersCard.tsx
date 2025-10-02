import React from 'react';

import {
  Bullseye,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Skeleton,
  Title,
} from '@patternfly/react-core';
import { QueryStatus } from '@tanstack/react-query';

import { useNavigate } from '~/common/routing';

import { DashboardCardError } from '../common/DashboardCardError';

type ClustersCardProps = {
  numberOfClusters: number;
  status: QueryStatus;
};

const ClustersCard = ({ numberOfClusters, status }: ClustersCardProps) => {
  const cardId = 'clusters-total-count-card';
  const navigate = useNavigate();

  return (
    <Card isFullHeight isClickable id={cardId}>
      <CardHeader
        selectableActions={{
          onClickAction: () => navigate('/cluster-list'),
          selectableActionId: `${cardId}-link`,
          selectableActionAriaLabelledby: cardId,
          name: 'clusters-card',
        }}
      >
        <CardTitle>Clusters</CardTitle>
      </CardHeader>
      <CardBody>
        <Bullseye>
          {(() => {
            switch (status) {
              case 'pending':
                return <Skeleton fontSize="3xl" width="23px" screenreaderText="Loading clusters" />;
              case 'error':
                return <DashboardCardError />;
              default:
                return <Title headingLevel="h1">{numberOfClusters}</Title>;
            }
          })()}
        </Bullseye>
      </CardBody>
    </Card>
  );
};

export { ClustersCard };
