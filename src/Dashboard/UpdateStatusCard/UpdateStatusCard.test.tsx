import React from 'react';

import { checkAccessibility, render, screen } from '~/testUtils';

import { UpdateStatusCard } from './UpdateStatusCard';

describe('UpdateStatusCard', () => {
  // elements with an img role must have an alternative text
  it.skip('is accessible', async () => {
    // Act
    const { container } = render(
      <UpdateStatusCard
        upToDateNumberOfClusters={0}
        updatableNumberOfClusters={0}
        status="success"
      />,
    );

    // Assert
    await checkAccessibility(container);
  });

  it('is rendering skeleton', () => {
    // Act
    render(
      <UpdateStatusCard
        upToDateNumberOfClusters={0}
        updatableNumberOfClusters={0}
        status="pending"
      />,
    );

    // Assert
    expect(screen.getByText(/loading update status chart/i)).toBeInTheDocument();
    expect(screen.getByText(/loading up to date clusters/i)).toBeInTheDocument();
    expect(screen.getByText(/loading updateable clusters/i)).toBeInTheDocument();
  });

  it('is rendering error', () => {
    // Act
    render(
      <UpdateStatusCard
        upToDateNumberOfClusters={0}
        updatableNumberOfClusters={0}
        status="error"
      />,
    );

    // Assert
    expect(screen.getByText(/update status/i)).toBeInTheDocument();
    expect(
      screen.getByText(/there was an error fetching the data\. try refreshing the page\./i),
    ).toBeInTheDocument();
  });

  it('is rendering chart', () => {
    // Act
    render(
      <UpdateStatusCard
        upToDateNumberOfClusters={10}
        updatableNumberOfClusters={20}
        status="success"
      />,
    );

    // Assert
    expect(screen.getByText(/update status/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(/up-to-date: 10 clusters/i)).toBeInTheDocument();
    expect(screen.getByText(/update available: 20 clusters/i)).toBeInTheDocument();
  });
});
