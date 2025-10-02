import React from 'react';

import { PaginationType } from '~/common/model/PaginationType';
import { defaultSubscription } from '~/components/clusters/common/__tests__/clusterStates.fixtures';
import { checkAccessibility, render, screen, within } from '~/testUtils';

import { ClustersWithIssuesTableCard } from './ClustersWithIssuesTableCard';

describe('ClustersWithIssuesTableCard', () => {
  it('is accessible', async () => {
    // Act
    const { container } = render(
      <ClustersWithIssuesTableCard
        clusters={[]}
        status="success"
        pagination={{
          total: 0,
          size: 0,
          page: 0,
        }}
        onPaginationChange={(_pagination: PaginationType) => {}}
      />,
    );

    // Assert
    await checkAccessibility(container);
  });

  it('is rendering skeleton', () => {
    // Act
    render(
      <ClustersWithIssuesTableCard
        clusters={[]}
        status="pending"
        pagination={{
          total: 5,
          size: 0,
          page: 0,
        }}
        onPaginationChange={(_pagination: PaginationType) => {}}
      />,
    );

    // Assert
    expect(screen.getByText(/loading cluster with issues name 0.../i)).toBeInTheDocument();
    expect(screen.getByText(/loading cluster with issues total 0.../i)).toBeInTheDocument();
    expect(screen.getByText(/loading cluster with issues action 0.../i)).toBeInTheDocument();
  });

  it('is rendering error', () => {
    // Act
    render(
      <ClustersWithIssuesTableCard
        clusters={[]}
        status="error"
        pagination={{
          total: 0,
          size: 0,
          page: 0,
        }}
        onPaginationChange={(_pagination: PaginationType) => {}}
      />,
    );

    // Assert
    expect(screen.getByText(/clusters with issues/i)).toBeInTheDocument();
    expect(
      screen.getByText(/there was an error fetching the data\. try refreshing the page\./i),
    ).toBeInTheDocument();
  });

  it('is rendering the table information', () => {
    // Act
    render(
      <ClustersWithIssuesTableCard
        status="success"
        clusters={
          [
            { ...defaultSubscription, display_name: 'Cluster Name 1', id: '1' },
            { ...defaultSubscription, display_name: 'Cluster Name 2', id: '2' },
          ] as any[]
        }
        pagination={{
          total: 2,
          size: 2,
          page: 1,
        }}
        onPaginationChange={(_pagination: PaginationType) => {}}
      />,
    );

    // Assert
    const row1 = screen.getByRole('row', {
      name: /cluster name 1 0/i,
    });
    expect(row1).toBeInTheDocument();
    within(row1).getByText(/0/i);

    const row2 = screen.getByRole('row', {
      name: /cluster name 2 0/i,
    });
    expect(row2).toBeInTheDocument();
    within(row2).getByText(/0/i);
  });
});
