import React from 'react';

import { EmptyState, EmptyStateBody } from '@patternfly/react-core';

const CPUMemoryUtilizationCardError = () => (
  <EmptyState titleText="No data available" headingLevel="h2">
    <EmptyStateBody>There was an error fetching the data. Try refreshing the page.</EmptyStateBody>
  </EmptyState>
);

export { CPUMemoryUtilizationCardError };
