import React from 'react';
import { useDispatch } from 'react-redux';

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
import { QueryStatus } from '@tanstack/react-query';

import getClusterName from '~/common/getClusterName';
import { PaginationType } from '~/common/model/PaginationType';
import { Link } from '~/common/routing';
import ArchiveClusterDialog from '~/components/clusters/common/ArchiveClusterDialog';
import EditSubscriptionSettingsDialog from '~/components/clusters/common/EditSubscriptionSettingsDialog/EditSubscriptionSettingsDialog';
import ConnectedModal from '~/components/common/Modal/ConnectedModal';
import { openModal } from '~/components/common/Modal/ModalActions';
import { Subscription } from '~/types/accounts_mgmt.v1';
import { ClusterFromSubscription } from '~/types/types';

import { DashboardCardError } from '../common/DashboardCardError';

import { ExpiredTrialsCardSkeleton } from './components/ExpiredTrialsCardSkeleton';
import { actionResolver } from './expiredTrialsCardHelper';

type ExpiredTrialsCardProps = {
  subscriptions?: Subscription[];
  status: QueryStatus;
  pagination: PaginationType;
  onPaginationChange: (pagination: PaginationType) => void;
  invalidateSubscriptions: () => void;
};

const ExpiredTrialsCard = ({
  subscriptions,
  status,
  pagination,
  onPaginationChange,
  invalidateSubscriptions,
}: ExpiredTrialsCardProps) => {
  const dispatch = useDispatch();

  const onSetPage: PaginationProps['onSetPage'] = (_event, page) =>
    onPaginationChange({ ...pagination, page });

  const onPerPageSelect: PaginationProps['onPerPageSelect'] = (_event, size, page) => {
    onPaginationChange({ ...pagination, size, page });
  };

  return (
    <Card>
      <CardTitle>Expired Trials</CardTitle>
      <CardBody>
        {(() => {
          switch (true) {
            case status === 'error':
              return <DashboardCardError />;
            case status === 'pending':
              return <ExpiredTrialsCardSkeleton />;
            case status === 'success' && (!subscriptions || subscriptions.length === 0):
              return (
                <EmptyState icon={CheckCircleIcon} status="success">
                  <EmptyStateBody>No expired clusters</EmptyStateBody>
                </EmptyState>
              );
            default:
              // @ts-ignore
              // @ts-ignore
              // @ts-ignore
              return (
                <>
                  <Table aria-label="expired trials table" variant={TableVariant.compact}>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th screenReaderText="expired trials actions" />
                      </Tr>
                    </Thead>
                    <Tbody>
                      {subscriptions?.map((subscription) => (
                        <Tr key={subscription.id}>
                          <Td dataLabel="name">
                            <Link to={`/details/s/${subscription.id}`}>
                              {getClusterName({ subscription } as ClusterFromSubscription)}
                            </Link>
                          </Td>
                          {/* // TODO: Any alternative to paddingRight? */}
                          <Td isActionCell style={{ paddingRight: 0 }}>
                            <ActionsColumn
                              items={actionResolver(
                                subscription,
                                (modalId: string, parameters: any) =>
                                  dispatch(
                                    openModal(modalId, {
                                      ...parameters,
                                      onSubmit: invalidateSubscriptions,
                                    }),
                                  ),
                              )}
                            />
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
                  />
                  {/* // TODO: remove connected modals! */}
                  <ConnectedModal
                    // @ts-ignore
                    ModalComponent={EditSubscriptionSettingsDialog}
                    onClose={invalidateSubscriptions}
                  />
                  <ConnectedModal
                    // @ts-ignore
                    ModalComponent={ArchiveClusterDialog}
                    onClose={invalidateSubscriptions}
                  />
                </>
              );
          }
        })()}
      </CardBody>
    </Card>
  );
};

export { ExpiredTrialsCard };
