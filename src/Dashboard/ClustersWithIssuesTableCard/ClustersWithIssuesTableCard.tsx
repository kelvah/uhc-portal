import React from 'react';

import {
  Card,
  CardBody,
  CardTitle,
  EmptyState,
  EmptyStateBody,
  Pagination,
  PaginationProps,
  PaginationVariant,
} from '@patternfly/react-core';
import { CheckCircleIcon } from '@patternfly/react-icons/dist/esm/icons/check-circle-icon';
import {
  ActionsColumn,
  Table,
  TableVariant,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';
import type { QueryStatus } from '@tanstack/react-query';

import getClusterName from '~/common/getClusterName';
import { PaginationType } from '~/common/model/PaginationType';
import { Link } from '~/common/routing';
import { Subscription } from '~/types/accounts_mgmt.v1';
import { ClusterFromSubscription } from '~/types/types';

import { DashboardCardError } from '../common/DashboardCardError';

import { ClustersWithIssuesTableCardSkeleton } from './components/ClustersWithIssuesTableCardSkeleton';
import { actionResolver, getIssuesCount } from './clustersWithIssuesTableCardHelper';

type ClustersWithIssuesTableCardProps = {
  clusters: ClusterFromSubscription[] | undefined;
  status: QueryStatus;
  pagination: PaginationType;
  onPaginationChange: (pagination: PaginationType) => void;
};

const ClustersWithIssuesTableCard = ({
  clusters,
  status,
  pagination,
  onPaginationChange,
}: ClustersWithIssuesTableCardProps) => {
  const onSetPage: PaginationProps['onSetPage'] = (_event, page) =>
    onPaginationChange({ ...pagination, page });

  const onPerPageSelect: PaginationProps['onPerPageSelect'] = (_event, size, page) => {
    onPaginationChange({ ...pagination, size, page });
  };

  return (
    <Card className="ocm-overview-clusters__card">
      <CardTitle>Clusters with issues</CardTitle>
      <CardBody>
        {(() => {
          switch (true) {
            case status === 'error':
              return <DashboardCardError />;
            case status === 'pending':
              return <ClustersWithIssuesTableCardSkeleton />;
            case status === 'success' && (!clusters || clusters.length === 0):
              return (
                <EmptyState status="success" icon={CheckCircleIcon}>
                  <EmptyStateBody>No issues detected</EmptyStateBody>
                </EmptyState>
              );
            default:
              return (
                <>
                  <Table aria-label="Cluster with issues table" variant={TableVariant.compact}>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th width={25} textCenter>
                          Issues detected
                        </Th>
                        <Th screenReaderText="Cluster with issues actions" />
                      </Tr>
                    </Thead>
                    <Tbody>
                      {clusters?.map((cluster) => (
                        <Tr key={cluster.id}>
                          <Td dataLabel="name">
                            <Link to={`/details/s/${cluster.id}`}>
                              {getClusterName({
                                subscription: cluster as any as Subscription,
                              } as ClusterFromSubscription)}
                            </Link>
                          </Td>
                          <Td textCenter>
                            <span>{getIssuesCount(cluster)}</span>
                          </Td>
                          {/* // TODO: Any alternative to paddingRight? */}
                          <Td isActionCell style={{ paddingRight: 0 }}>
                            <ActionsColumn items={actionResolver(cluster)} />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                  <Pagination
                    itemCount={pagination.total}
                    perPage={pagination.size}
                    page={pagination.page}
                    variant={PaginationVariant.bottom}
                    onSetPage={onSetPage}
                    onPerPageSelect={onPerPageSelect}
                    perPageOptions={[
                      { title: '5', value: 5 },
                      { title: '10', value: 10 },
                      { title: '20', value: 20 },
                      { title: '50', value: 50 },
                      { title: '100', value: 100 },
                    ]}
                  />
                </>
              );
          }
        })()}
      </CardBody>
    </Card>
  );
};

export { ClustersWithIssuesTableCard };
