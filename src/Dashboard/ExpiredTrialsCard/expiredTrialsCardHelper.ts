import { IActions } from '@patternfly/react-table';

import modals from '~/components/common/Modal/modals';
import { Subscription } from '~/types/accounts_mgmt.v1';

const actionResolver = (
  subscription: Subscription,
  openModal: (modalId: string, modalParams: any) => void,
): IActions => [
  {
    title: 'Edit subscription settings',
    onClick: () => openModal(modals.EDIT_SUBSCRIPTION_SETTINGS, { subscription }),
  },
  {
    title: 'Archive cluster',
    onClick: () =>
      openModal(modals.ARCHIVE_CLUSTER, {
        subscriptionID: subscription.id,
        name: subscription.display_name || subscription.external_cluster_id,
      }),
  },
];

export { actionResolver };
