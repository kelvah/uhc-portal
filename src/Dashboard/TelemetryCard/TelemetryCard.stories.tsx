import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { TelemetryCard } from '~/Dashboard/TelemetryCard/TelemetryCard';

const meta: Meta<typeof TelemetryCard> = {
  title: 'Dashboard/Telemetry Card',
  component: TelemetryCard,
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

type Story = StoryObj<typeof TelemetryCard>;

export const WithData: Story = {
  args: {
    status: 'success',
    totalClusters: 1,
    totalConnectedClusters: 0,
  },
};

export const WithNoData: Story = {
  args: {
    status: 'success',
    totalClusters: 0,
    totalConnectedClusters: 0,
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
