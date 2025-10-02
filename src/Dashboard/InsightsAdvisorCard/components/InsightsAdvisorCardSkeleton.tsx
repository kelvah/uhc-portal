import React from 'react';

import { Flex, FlexItem, Grid, GridItem, Skeleton, Title } from '@patternfly/react-core';

const InsightsAdvisorCardSkeleton = () => (
  <Grid hasGutter>
    <GridItem span={12}>
      <Grid hasGutter>
        <GridItem span={12}>
          <Title size="lg" headingLevel="h2">
            Advisor recommendations by severity
          </Title>
        </GridItem>
        <GridItem span={12} style={{ marginLeft: 'var(--pf-v5-global--spacer--md)' }}>
          <Grid hasGutter>
            {[...Array(4).keys()].map((e) => (
              <GridItem span={2}>
                <Skeleton width="80%" shape="circle" />
              </GridItem>
            ))}
            <GridItem span={4} />
          </Grid>
        </GridItem>
      </Grid>
    </GridItem>
    <GridItem span={12}>
      <Grid hasGutter>
        <GridItem span={12}>
          <Title size="lg" headingLevel="h2">
            Recommendations by category
          </Title>
        </GridItem>
        <GridItem span={12} style={{ marginLeft: 'var(--pf-v5-global--spacer--md)' }}>
          <Flex>
            <Flex
              direction={{ default: 'column' }}
              flex={{ default: 'flex_1' }}
              alignContent={{ default: 'alignContentCenter' }}
            >
              <FlexItem>
                <Skeleton shape="circle" height="190px" width="190px" />
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
                    <Skeleton />
                  </GridItem>
                  <GridItem span={6}>
                    <Skeleton />
                  </GridItem>
                </Grid>
              </FlexItem>
              <FlexItem>
                <Grid hasGutter>
                  <GridItem span={6}>
                    <Skeleton />
                  </GridItem>
                  <GridItem span={6}>
                    <Skeleton />
                  </GridItem>
                </Grid>
              </FlexItem>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </GridItem>
    <GridItem span={12}>
      <Skeleton />
    </GridItem>
  </Grid>
);

export { InsightsAdvisorCardSkeleton };
