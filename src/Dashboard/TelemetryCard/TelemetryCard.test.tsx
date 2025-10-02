import React from 'react';

import { checkAccessibility, render, screen } from '~/testUtils';

import { TelemetryCard } from './TelemetryCard';

describe('TelemetryCard', () => {
  // elements with an img role must have an alternative text
  it.skip('is accessible', async () => {
    // Act
    const { container } = render(
      <TelemetryCard totalClusters={0} totalConnectedClusters={0} status="success" />,
    );

    // Assert
    await checkAccessibility(container);
  });

  it('is rendering skeleton', () => {
    // Act
    render(<TelemetryCard totalClusters={0} totalConnectedClusters={0} status="pending" />);

    // Assert
    expect(screen.getByText(/loading telemetry chart/i)).toBeInTheDocument();
    expect(screen.getByText(/loading connected telemetry/i)).toBeInTheDocument();
    expect(screen.getByText(/loading not checking telemetry/i)).toBeInTheDocument();
  });

  it('is rendering error', () => {
    // Act
    render(<TelemetryCard totalClusters={0} totalConnectedClusters={0} status="error" />);

    // Assert
    expect(screen.getByText(/telemetry/i)).toBeInTheDocument();
    expect(
      screen.getByText(/there was an error fetching the data\. try refreshing the page\./i),
    ).toBeInTheDocument();
  });

  it('is rendering chart', () => {
    // Act
    render(<TelemetryCard totalClusters={10} totalConnectedClusters={20} status="success" />);

    // Assert
    expect(screen.getByText(/telemetry/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(/connected: 20 clusters/i)).toBeInTheDocument();
    expect(screen.getByText(/not checking in: -10 clusters/i)).toBeInTheDocument();
  });
});
