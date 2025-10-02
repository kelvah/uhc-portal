import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { CPUMemoryUtilizationCard } from '~/Dashboard/CPUMemoryUtilizationCard/CPUMemoryUtilizationCard';

const meta: Meta<typeof CPUMemoryUtilizationCard> = {
  title: 'Dashboard/CPU Memory Utilization Card',
  component: CPUMemoryUtilizationCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['!autodocs'],
};

export default meta;

type Story = StoryObj<typeof CPUMemoryUtilizationCard>;

export const WithData: Story = {
  args: {
    status: 'success',
    totalConnectedClusters: {
      value: 8,
      unit: 'B',
    },
    totalCPU: {
      value: 536,
      unit: 'B',
    },
    totalMem: {
      value: 2645257187328,
      unit: 'B',
    },
    usedCPU: {
      value: 67.65428586662995,
      unit: 'B',
    },
    usedMem: {
      value: 668887220224,
      unit: 'B',
    },
  },
};

export const WithNoData: Story = {
  args: {
    status: 'success',
    totalConnectedClusters: {
      value: 8,
      unit: 'B',
    },
    totalCPU: {
      value: 0,
      unit: 'B',
    },
    totalMem: {
      value: 0,
      unit: 'B',
    },
    usedCPU: {
      value: 0,
      unit: 'B',
    },
    usedMem: {
      value: 0,
      unit: 'B',
    },
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
