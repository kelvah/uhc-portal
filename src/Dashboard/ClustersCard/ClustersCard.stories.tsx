import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ClustersCard } from '~/Dashboard/ClustersCard/ClustersCard';

const meta: Meta<typeof ClustersCard> = {
  title: 'Dashboard/Clusters Card',
  component: ClustersCard,
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

type Story = StoryObj<typeof ClustersCard>;

export const WithClusters: Story = {
  args: {
    status: 'success',
    numberOfClusters: 3,
  },
};

export const WithNoClusteres: Story = {
  args: {
    status: 'success',
    numberOfClusters: 0,
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
