import React from 'react';

import { checkAccessibility, render, screen } from '~/testUtils';

import { CPUMemoryUtilizationCard } from './CPUMemoryUtilizationCard';

describe('CPUMemoryUtilizationCard', () => {
  it('is accessible', async () => {
    // Act
    const { container } = render(
      <CPUMemoryUtilizationCard
        totalCPU={{
          unit: '',
          value: 0,
        }}
        usedCPU={{
          unit: '',
          value: 0,
        }}
        status="success"
        totalMem={{
          unit: '',
          value: 0,
        }}
        usedMem={{
          unit: '',
          value: 0,
        }}
        totalConnectedClusters={{
          unit: '',
          value: 0,
        }}
      />,
    );

    // Assert
    await checkAccessibility(container);
  });

  it('is rendering skeleton', () => {
    // Act
    render(
      <CPUMemoryUtilizationCard
        totalConnectedClusters={{ value: 10, unit: 'B' }}
        totalCPU={{ value: 20, unit: 'B' }}
        totalMem={{ value: 30, unit: 'B' }}
        usedCPU={{ value: 40, unit: 'B' }}
        usedMem={{ value: 50, unit: 'B' }}
        status="pending"
      />,
    );

    // Assert
    expect(screen.getByText(/cpu and memory utilization/i)).toBeInTheDocument();

    expect(screen.getByText(/loading title for vcpu/i)).toBeInTheDocument();
    expect(screen.getByText(/loading data for vcpu/i)).toBeInTheDocument();
    expect(screen.getByText(/loading used data for vcpu/i)).toBeInTheDocument();
    expect(screen.getByText(/loading available data for vcpu/i)).toBeInTheDocument();

    expect(screen.getByText(/loading title for memory/i)).toBeInTheDocument();
    expect(screen.getByText(/loading data for memory/i)).toBeInTheDocument();
    expect(screen.getByText(/loading used data for memory/i)).toBeInTheDocument();
    expect(screen.getByText(/loading available data for memory/i)).toBeInTheDocument();
  });

  it('is rendering error', () => {
    // Act
    render(
      <CPUMemoryUtilizationCard
        totalConnectedClusters={{ value: 10, unit: 'B' }}
        totalCPU={{ value: 20, unit: 'B' }}
        totalMem={{ value: 30, unit: 'B' }}
        usedCPU={{ value: 40, unit: 'B' }}
        usedMem={{ value: 50, unit: 'B' }}
        status="error"
      />,
    );

    // Assert
    expect(screen.getByText(/cpu and memory utilization/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /no data available/i,
      }),
    ).toBeInTheDocument();
  });

  it('is rendering graphs', () => {
    // Act
    render(
      <CPUMemoryUtilizationCard
        totalConnectedClusters={{ value: 10, unit: 'B' }}
        totalCPU={{ value: 20, unit: 'B' }}
        totalMem={{ value: 30, unit: 'B' }}
        usedCPU={{ value: 40, unit: 'B' }}
        usedMem={{ value: 50, unit: 'B' }}
        status="success"
      />,
    );

    // Assert
    expect(screen.getByText(/cpu and memory utilization/i)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: /vcpu/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/200%/i)).toBeInTheDocument();
    expect(screen.getByText(/of 20 cores used/i)).toBeInTheDocument();
    expect(screen.getByText(/used: 40 cores/i)).toBeInTheDocument();
    expect(screen.getByText(/available: -20 cores/i)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: /memory/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/166.67%/i)).toBeInTheDocument();
    expect(screen.getByText(/of 30 B used/i)).toBeInTheDocument();
    expect(screen.getByText(/used: 50 B/i)).toBeInTheDocument();
    expect(screen.getByText(/available: -20 B/i)).toBeInTheDocument();
  });
});
