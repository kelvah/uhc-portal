import React from 'react';

import {
  CardBody,
  CardFooter,
  Content,
  ContentVariants,
  Grid,
  GridItem,
  Skeleton,
} from '@patternfly/react-core';

const CostCardSkeleton = () => (
  <>
    <CardBody className="ocm--cost-card__body">
      <Grid hasGutter>
        <GridItem lg={5} md={12}>
          <Skeleton screenreaderText="Loading moth-to-date cost" />
          <span className="ocm--cost-total__desc">Month-to-date cost</span>
        </GridItem>
        <GridItem lg={7} md={12}>
          <div className="ocm--cost-clusters">
            <Content>
              <Content component={ContentVariants.dl}>
                <Content component={ContentVariants.dt} key="top-clusters">
                  Top clusters
                </Content>
                <>
                  <Content component={ContentVariants.dt}>
                    <Skeleton screenreaderText="Loading cost id" />
                  </Content>
                  <Content component={ContentVariants.dd}>
                    <Skeleton screenreaderText="Loading cost value" />
                  </Content>
                </>
                <>
                  <Content component={ContentVariants.dt}>
                    <Skeleton screenreaderText="Loading cost id" />
                  </Content>
                  <Content component={ContentVariants.dd}>
                    <Skeleton screenreaderText="Loading cost value" />
                  </Content>
                </>
              </Content>
            </Content>
          </div>
        </GridItem>
      </Grid>
    </CardBody>
    <CardFooter>
      <Skeleton screenreaderText="Loading View more in Cost management link" />
    </CardFooter>
  </>
);

export { CostCardSkeleton };
