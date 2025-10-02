import React from 'react';

import { checkAccessibility, render, screen } from '~/testUtils';

import { ClustersWithIssuesCard } from './ClustersWithIssuesCard';

describe('ClustersWithIssuesCard', () => {
  it('is accessible', async () => {
    // Act
    const { container } = render(
      <ClustersWithIssuesCard
        totalConnectedClusters={0}
        totalUnhealthyClusters={0}
        status="success"
      />,
    );

    // Assert
    await checkAccessibility(container);
  });

  it('is rendering skeleton', () => {
    // Act
    render(
      <ClustersWithIssuesCard
        totalConnectedClusters={0}
        totalUnhealthyClusters={0}
        status="pending"
      />,
    );

    // Assert
    expect(screen.getByText(/loading clusters with issues/i)).toBeInTheDocument();
  });

  it('is rendering error', () => {
    // Act
    render(
      <ClustersWithIssuesCard
        totalConnectedClusters={0}
        totalUnhealthyClusters={0}
        status="error"
      />,
    );

    // Assert
    expect(screen.getByText(/clusters with issues/i)).toBeInTheDocument();
    expect(
      screen.getByText(/there was an error fetching the data\. try refreshing the page\./i),
    ).toBeInTheDocument();
  });

  it('is rendering amount', () => {
    // Act
    render(
      <ClustersWithIssuesCard
        totalConnectedClusters={10}
        totalUnhealthyClusters={20}
        status="success"
      />,
    );

    // Assert
    expect(screen.getByText(/clusters with issues/i)).toBeInTheDocument();
    expect(screen.getByText(/20/i)).toBeInTheDocument();
  });
});
