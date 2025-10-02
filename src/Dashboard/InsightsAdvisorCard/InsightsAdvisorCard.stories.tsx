import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { InsightsAdvisorCard } from '~/Dashboard/InsightsAdvisorCard/InsightsAdvisorCard';

const meta: Meta<typeof InsightsAdvisorCard> = {
  title: 'Dashboard/Insights Advisor Card',
  component: InsightsAdvisorCard,
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

type Story = StoryObj<typeof InsightsAdvisorCard>;

export const WithData: Story = {
  args: {
    status: 'success',
    clustersHit: 4,
    hitByRisk: {
      '2': 3,
      '3': 3,
    },
    hitByTag: {
      best_practice: 3,
      incident: 3,
      osd_customer: 5,
      performance: 2,
      security: 1,
      service_availability: 3,
    },
  },
};

export const WithNoRecommendations: Story = {
  args: {
    status: 'success',
    clustersHit: 0,
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
