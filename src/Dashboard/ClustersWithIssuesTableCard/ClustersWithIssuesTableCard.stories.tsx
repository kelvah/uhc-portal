import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ClustersWithIssuesTableCard } from '~/Dashboard/ClustersWithIssuesTableCard/ClustersWithIssuesTableCard';
import { OneMetric } from '~/types/accounts_mgmt.v1';

const meta: Meta<typeof ClustersWithIssuesTableCard> = {
  title: 'Dashboard/Clusters With Issues Table Card',
  component: ClustersWithIssuesTableCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onPaginationChange: () => {},
  },
  tags: ['!autodocs'],
};

export default meta;

type Story = StoryObj<typeof ClustersWithIssuesTableCard>;

const baseCluster = {
  managed: false,
  metrics: { critical_alerts_firing: 1, operators_condition_failing: 1 } as OneMetric,
};

const clusters = [
  {
    ...baseCluster,
    display_name: 'Cluster Name 1',
    id: '1',
  },
  {
    ...baseCluster,
    display_name: 'Cluster Name 2',
    id: '2',
  },
];

export const WithUnhealthyClusters: Story = {
  args: {
    status: 'success',
    clusters,
    pagination: { page: 1, size: 5, total: 2 },
  },
};

export const WithNoUnhealthyClusters: Story = {
  args: {
    status: 'success',
    clusters: [],
    pagination: { page: 1, size: 5, total: 0 },
  },
};

export const ErrorStatus: Story = {
  args: {
    status: 'error',
    pagination: { page: 1, size: 5 },
  },
};

export const LoadingStatus: Story = {
  args: {
    status: 'pending',
    pagination: { page: 1, size: 5 },
  },
};
