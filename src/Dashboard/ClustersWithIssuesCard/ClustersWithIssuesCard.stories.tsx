import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ClustersWithIssuesCard } from '~/Dashboard/ClustersWithIssuesCard/ClustersWithIssuesCard';

const meta: Meta<typeof ClustersWithIssuesCard> = {
  title: 'Dashboard/Clusters With Issues Card',
  component: ClustersWithIssuesCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['!autodocs'],
};

export default meta;

type Story = StoryObj<typeof ClustersWithIssuesCard>;

export const WithUnhealthyClusters: Story = {
  args: {
    status: 'success',
    totalConnectedClusters: 3,
    totalUnhealthyClusters: 2,
  },
};

export const WithNoUnhealthyClusters: Story = {
  args: {
    status: 'success',
    totalConnectedClusters: 3,
    totalUnhealthyClusters: 0,
  },
};

export const WithNoClusters: Story = {
  args: {
    status: 'success',
    totalConnectedClusters: 0,
    totalUnhealthyClusters: 0,
  },
};

export const LoadingStatus: Story = {
  args: {
    status: 'pending',
  },
};

export const ErrorStatus: Story = {
  args: {
    status: 'error',
  },
};
