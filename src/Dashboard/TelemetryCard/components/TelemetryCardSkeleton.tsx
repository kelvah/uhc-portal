import React from 'react';

import { Flex, FlexItem, Grid, GridItem, Skeleton } from '@patternfly/react-core';

const TelemetryCardSkeleton = () => (
  <Grid hasGutter>
    <GridItem span={12} style={{ marginLeft: 'var(--pf-v5-global--spacer--md)' }}>
      <Flex>
        <Flex
          direction={{ default: 'column' }}
          flex={{ default: 'flex_1' }}
          alignContent={{ default: 'alignContentCenter' }}
        >
          <FlexItem>
            <Skeleton
              shape="circle"
              height="190px"
              width="190px"
              screenreaderText="Loading telemetry chart"
            />
          </FlexItem>
        </Flex>
        <Flex
          direction={{ default: 'column' }}
          alignSelf={{ default: 'alignSelfCenter' }}
          flex={{ default: 'flex_4' }}
        >
          <FlexItem>
            <Grid hasGutter>
              <GridItem span={6}>
                <Skeleton screenreaderText="Loading connected telemetry" />
              </GridItem>
            </Grid>
          </FlexItem>
          <FlexItem>
            <Grid hasGutter>
              <GridItem span={6}>
                <Skeleton screenreaderText="Loading not checking telemetry" />
              </GridItem>
            </Grid>
          </FlexItem>
        </Flex>
      </Flex>
    </GridItem>
  </Grid>
);

export { TelemetryCardSkeleton };
