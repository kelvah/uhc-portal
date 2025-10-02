import React from 'react';

import { PaginationType } from '~/common/model/PaginationType';
import { defaultSubscription } from '~/components/clusters/common/__tests__/clusterStates.fixtures';
import { checkAccessibility, render, screen } from '~/testUtils';

import { ExpiredTrialsCard } from './ExpiredTrialsCard';

describe('ExpiredTrialsCard', () => {
  it('is accessible', async () => {
    // Act
    const { container } = render(
      <ExpiredTrialsCard
        subscriptions={[]}
        status="success"
        pagination={{
          total: 0,
          size: 0,
          page: 0,
        }}
        onPaginationChange={(_pagination: PaginationType) => {}}
        invalidateSubscriptions={() => {}}
      />,
    );

    // Assert
    await checkAccessibility(container);
  });

  it('is rendering skeleton', () => {
    // Act
    render(
      <ExpiredTrialsCard
        subscriptions={[]}
        status="pending"
        pagination={{
          total: 5,
          size: 0,
          page: 0,
        }}
        onPaginationChange={(_pagination: PaginationType) => {}}
        invalidateSubscriptions={() => {}}
      />,
    );

    // Assert
    expect(screen.getByText(/loading expired trials name 0.../i)).toBeInTheDocument();
    expect(screen.getByText(/loading expired trials action 0.../i)).toBeInTheDocument();
  });

  it('is rendering error', () => {
    // Act
    render(
      <ExpiredTrialsCard
        subscriptions={[]}
        status="error"
        pagination={{
          total: 0,
          size: 0,
          page: 0,
        }}
        onPaginationChange={(_pagination: PaginationType) => {}}
        invalidateSubscriptions={() => {}}
      />,
    );

    // Assert
    expect(screen.getByText(/expired trials/i)).toBeInTheDocument();
    expect(
      screen.getByText(/there was an error fetching the data\. try refreshing the page\./i),
    ).toBeInTheDocument();
  });

  it('is rendering the table information', () => {
    // Act
    render(
      <ExpiredTrialsCard
        status="success"
        subscriptions={[
          { ...defaultSubscription, display_name: 'Cluster Name 1', id: '1' },
          { ...defaultSubscription, display_name: 'Cluster Name 2', id: '2' },
        ]}
        pagination={{
          total: 2,
          size: 2,
          page: 1,
        }}
        onPaginationChange={(_pagination: PaginationType) => {}}
        invalidateSubscriptions={() => {}}
      />,
    );

    // Assert
    expect(
      screen.getByRole('row', {
        name: /cluster name 1/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('row', {
        name: /cluster name 2/i,
      }),
    ).toBeInTheDocument();
  });
});
