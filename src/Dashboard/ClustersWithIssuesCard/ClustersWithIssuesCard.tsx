import React from 'react';

import {
  Bullseye,
  Card,
  CardBody,
  CardTitle,
  Flex,
  FlexItem,
  Icon,
  Skeleton,
  Title,
} from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';
import { OkIcon } from '@patternfly/react-icons/dist/esm/icons/ok-icon';
import { t_global_color_status_danger_100 as dangerColor } from '@patternfly/react-tokens/dist/esm/t_global_color_status_danger_100';
import { t_global_color_status_success_100 as successColor } from '@patternfly/react-tokens/dist/esm/t_global_color_status_success_100';
import { QueryStatus } from '@tanstack/react-query';

import { DashboardCardError } from '../common/DashboardCardError';

type ClustersWithIssuesCardProps = {
  totalUnhealthyClusters: number;
  totalConnectedClusters: number;
  status: QueryStatus;
};

const ClustersWithIssuesCard = ({
  totalUnhealthyClusters,
  totalConnectedClusters,
  status,
}: ClustersWithIssuesCardProps) => (
  <Card isFullHeight>
    <CardTitle>Clusters with issues</CardTitle>
    <CardBody>
      {(() => {
        switch (true) {
          case status === 'pending':
            return (
              <Bullseye>
                <Skeleton
                  fontSize="3xl"
                  width="23px"
                  screenreaderText="Loading clusters with issues"
                />
              </Bullseye>
            );
          case status === 'error':
            return <DashboardCardError />;
          case status === 'success' && totalConnectedClusters > 0:
            return (
              <Bullseye>
                <Flex
                  spaceItems={{ default: 'spaceItemsSm' }}
                  alignItems={{ default: 'alignItemsCenter' }}
                >
                  <FlexItem>
                    <Title
                      headingLevel="h2"
                      size="3xl"
                      className={`${totalUnhealthyClusters > 0 ? 'pf-v5-u-danger-color-200' : ''}`}
                    >
                      {totalUnhealthyClusters}
                    </Title>
                  </FlexItem>
                  <FlexItem>
                    <Icon size="md">
                      {totalUnhealthyClusters === 0 ? (
                        <OkIcon color={successColor.value} data-testid="ok-icon" />
                      ) : (
                        <ExclamationCircleIcon
                          color={dangerColor.value}
                          data-testid="exclamation-icon"
                        />
                      )}
                    </Icon>
                  </FlexItem>
                </Flex>
              </Bullseye>
            );
          default:
            return (
              <Bullseye>
                <span>No data available</span>
              </Bullseye>
            );
        }
      })()}
    </CardBody>
  </Card>
);

export { ClustersWithIssuesCard };
