import React from 'react';

import { Card, CardBody, Grid, GridItem } from '@patternfly/react-core';
import { QueryStatus } from '@tanstack/react-query';

import { advisorBaseName } from '~/common/routing';
import { INSIGHTS_RULE_CATEGORIES } from '~/components/clusters/ClusterDetailsMultiRegion/components/Insights/InsightsConstants';

import { DashboardCardError } from '../common/DashboardCardError';

import { ChartByGroups } from './components/ChartByGroups';
import { ChartByRisks } from './components/ChartByRisks';
import { InsightsAdvisorCardEmpty } from './components/InsightsAdvisorCardEmpty';
import { InsightsAdvisorCardSkeleton } from './components/InsightsAdvisorCardSkeleton';

type InsightsAdvisorCardProps = {
  clustersHit?: number;
  hitByRisk?: Record<string, number>;
  hitByTag?: Record<string, number>;
  status: QueryStatus;
};

const InsightsAdvisorCard = ({
  clustersHit,
  hitByRisk,
  hitByTag,
  status,
}: InsightsAdvisorCardProps) => (
  <Card isFullHeight>
    <CardBody>
      {(() => {
        switch (true) {
          case status === 'pending':
            return <InsightsAdvisorCardSkeleton />;
          case status === 'error':
            return <DashboardCardError />;
          case status === 'success' && clustersHit && clustersHit > 0:
            return (
              <Grid hasGutter>
                <GridItem span={12}>
                  <ChartByRisks hitByRisk={hitByRisk} />
                </GridItem>
                <GridItem span={12}>
                  <ChartByGroups hitByTag={hitByTag} groups={INSIGHTS_RULE_CATEGORIES} />
                </GridItem>
                <GridItem span={12}>
                  <a href={advisorBaseName}>View more in Insights Advisor</a>
                </GridItem>
              </Grid>
            );
          default:
            return <InsightsAdvisorCardEmpty />;
        }
      })()}
    </CardBody>
  </Card>
);

export { InsightsAdvisorCard };
