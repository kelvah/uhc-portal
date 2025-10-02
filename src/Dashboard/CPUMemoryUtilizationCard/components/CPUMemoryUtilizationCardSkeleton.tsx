import React from 'react';

import { Grid, GridItem, Skeleton } from '@patternfly/react-core';

const ResourceUsageSkeleton = ({ title }: { title: string }) => (
  <Grid hasGutter>
    <GridItem span={12} className="pf-v5-u-text-align-center">
      <Skeleton width="50%" fontSize="3xl" screenreaderText={`Loading title for ${title}`} />
    </GridItem>
    <GridItem span={6}>
      <Skeleton shape="circle" width="100%" screenreaderText={`Loading Data for ${title}`} />
    </GridItem>
    <GridItem span={6}>
      <Grid hasGutter>
        <GridItem rowSpan={4} />
        <GridItem rowSpan={2}>
          <Skeleton fontSize="sm" screenreaderText={`Loading Used Data for ${title}`} />
        </GridItem>
        <GridItem rowSpan={2}>
          <Skeleton fontSize="sm" screenreaderText={`Loading Available Data for ${title}`} />
        </GridItem>
        <GridItem rowSpan={4} />
      </Grid>
    </GridItem>
  </Grid>
);

const CPUMemoryUtilizationCardSkeleton = () => (
  <Grid hasGutter style={{ width: '100%' }}>
    <GridItem span={1} />
    <GridItem span={4}>
      <ResourceUsageSkeleton title="vCPU" />
    </GridItem>
    <GridItem span={1} />
    <GridItem span={4}>
      <ResourceUsageSkeleton title="Memory" />
    </GridItem>
    <GridItem span={1} />
  </Grid>
);

export { CPUMemoryUtilizationCardSkeleton };
