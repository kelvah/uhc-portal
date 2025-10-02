import React from 'react';

import { checkAccessibility, render, screen } from '~/testUtils';

import { ClustersCard } from './ClustersCard';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ClustersCard', () => {
  it('is accessible', async () => {
    // Act
    const { container } = render(<ClustersCard numberOfClusters={0} status="success" />);

    // Assert
    await checkAccessibility(container);
  });

  it('is rendering skeleton', () => {
    // Act
    render(<ClustersCard numberOfClusters={0} status="pending" />);

    // Assert
    expect(screen.getByText(/loading clusters/i)).toBeInTheDocument();
  });

  it('is rendering error', () => {
    // Act
    render(<ClustersCard numberOfClusters={0} status="error" />);

    // Assert
    expect(screen.getByText(/clusters/i)).toBeInTheDocument();
    expect(
      screen.getByText(/there was an error fetching the data\. try refreshing the page\./i),
    ).toBeInTheDocument();
  });

  it('is rendering amount', () => {
    // Act
    render(<ClustersCard numberOfClusters={150} status="success" />);

    // Assert
    expect(screen.getByText(/clusters/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /150/i,
      }),
    ).toBeInTheDocument();
  });

  it('is navigating on click', async () => {
    // Arrange
    const { user } = render(<ClustersCard numberOfClusters={150} status="success" />);

    // Act
    await user.click(
      screen.getByRole('radio', {
        name: /clusters 150/i,
      }),
    );

    // Assert
    return expect(mockNavigate).toHaveBeenLastCalledWith('/openshift/cluster-list', undefined);
  });
});
