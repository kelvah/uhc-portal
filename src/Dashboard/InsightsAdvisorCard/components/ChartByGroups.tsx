import React from 'react';

import { ChartLegend, ChartPie } from '@patternfly/react-charts/victory';
import { Grid, GridItem, Title } from '@patternfly/react-core';

import { InsightsRuleCategories } from '~/components/clusters/ClusterDetailsMultiRegion/components/Insights/InsightsConstants';

import { groupTagHitsByGroups } from './utils/InsightsAdvisorCardHelper';
import { ChartByGroupsTitleComponent } from './ChartByGroupsTitleComponent';

type ChartByGroupsProps = {
  hitByTag?: Record<string, number>;
  groups: InsightsRuleCategories[];
};

const ChartByGroups = ({ hitByTag, groups }: ChartByGroupsProps) => {
  const groupedRulesByGroups = groupTagHitsByGroups(hitByTag, [...groups]) ?? {};
  const totalHits = Object.values(groupedRulesByGroups).reduce((acc, { count }) => acc + count, 0);

  return (
    <Grid hasGutter>
      <GridItem span={12}>
        <Title size="lg" headingLevel="h2">
          Recommendations by category
        </Title>
      </GridItem>
      <GridItem span={12} style={{ marginLeft: 'var(--pf-v5-global--spacer--md)' }}>
        <ChartPie
          labelRadius={25}
          ariaTitle="Categories statistics"
          constrainToVisibleArea
          data={Object.entries(groupedRulesByGroups).map(([title, group]) => ({
            x: title,
            y: group.count,
          }))}
          height={120}
          width={400}
          padding={{
            bottom: 0,
            left: 0,
            right: 300, // Adjusted to accommodate legend
            top: 0,
          }}
          labels={({ datum }) =>
            parseInt(datum.y, 10) === 0 || totalHits === 0
              ? ''
              : `${((parseInt(datum.y, 10) / totalHits) * 100).toFixed()}%`
          }
          legendData={Object.entries(groupedRulesByGroups).map(([title, { count, tags }]) => ({
            name: title,
            count,
            tags,
            symbol: { type: 'circle' },
          }))}
          legendPosition="right"
          legendAllowWrap
          legendComponent={
            <ChartLegend
              labelComponent={<ChartByGroupsTitleComponent />}
              height={100}
              width={300}
              itemsPerRow={2}
              orientation="horizontal"
              style={{ labels: { fontSize: 12 } }}
              gutter={30}
            />
          }
        />
      </GridItem>
    </Grid>
  );
};

export { ChartByGroups };
