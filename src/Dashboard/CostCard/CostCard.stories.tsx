import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { CostCard } from '~/Dashboard/CostCard/CostCard';

const meta: Meta<typeof CostCard> = {
  title: 'Dashboard/Cost Card',
  component: CostCard,
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

type Story = StoryObj<typeof CostCard>;

export const WithData: Story = {
  args: {
    isLoading: false,
    sources: {
      meta: {
        count: 2,
      },
      data: [],
    },
    report: {
      meta: {
        total: {
          cost: {
            total: {
              units: 'USD',
              value: 3000,
            },
          },
        },
      },
      data: [
        {
          clusters: [
            {
              values: [
                {
                  clusters: ['some cluster name'],
                  cost: {
                    total: {
                      units: 'USD',
                      value: 700,
                    },
                  },
                },
                {
                  clusters: ['another cluster name'],
                  cost: {
                    total: {
                      units: 'USD',
                      value: 2300,
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  },
};

export const WithNoData: Story = {
  args: {
    isLoading: false,
    sources: {
      meta: {
        count: 0,
      },
      data: [],
    },
  },
};

export const LoadingStatus: Story = {
  args: {
    isLoading: true,
  },
};
