import React from 'react';

import { Content, ContentVariants, Grid, GridItem, Title } from '@patternfly/react-core';

import { CostSummaryClusters } from '~/Dashboard/CostCard/components/CostSummaryClusters';
import { CostReport } from '~/Dashboard/CostCard/costTypes';

import { getTotal } from './costSummaryHelpers';

type CostSummaryProps = {
  report: CostReport;
};

const CostSummary = ({ report }: CostSummaryProps) => (
  <Grid hasGutter>
    <GridItem lg={5} md={12}>
      <Title className="ocm--cost-total" size="2xl" headingLevel="h2">
        {getTotal(report)}
      </Title>
      <span className="ocm--cost-total__desc">Month-to-date cost</span>
    </GridItem>
    <GridItem lg={7} md={12}>
      <div className="ocm--cost-clusters">
        <Content>
          <Content component={ContentVariants.dl}>
            <Content component={ContentVariants.dt} key="top-clusters">
              Top clusters
            </Content>
            <CostSummaryClusters report={report} />
          </Content>
        </Content>
      </div>
    </GridItem>
  </Grid>
);
export { CostSummary };
