import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { UpdateStatusCard } from '~/Dashboard/UpdateStatusCard/UpdateStatusCard';

const meta: Meta<typeof UpdateStatusCard> = {
  title: 'Dashboard/Update Status Card',
  component: UpdateStatusCard,
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

type Story = StoryObj<typeof UpdateStatusCard>;

export const WithData: Story = {
  args: {
    status: 'success',
    updatableNumberOfClusters: 10,
    upToDateNumberOfClusters: 0,
  },
};

export const WithNoData: Story = {
  args: {
    status: 'success',
    updatableNumberOfClusters: 0,
    upToDateNumberOfClusters: 0,
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
