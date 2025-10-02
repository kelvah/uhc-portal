import React from 'react';

import { Content, ContentVariants } from '@patternfly/react-core';

import { CostReport, ReportCluster } from '../costTypes';

import { formatCurrency, formatPercentage } from './costSummaryHelpers';

type CostSummaryClustersProps = {
  report: CostReport;
};

const CostSummaryClusters = ({ report }: CostSummaryClustersProps) => {
  const total = report?.meta?.total?.cost?.total?.value ?? 0;

  return report?.meta?.total?.cost?.total ? (
    <>
      {report.data.map((dataItem) =>
        (dataItem.clusters as ReportCluster[]).map((cluster) =>
          cluster.values.map((value) => {
            const id = value.clusters && value.clusters.length ? value.clusters[0] : value.cluster;
            const cost = value?.cost?.total?.value ?? 0;
            const units = value?.cost?.total?.units ?? 'USD';
            const percentage = total > 0 ? cost / total : 0;
            const val = `${formatCurrency(cost, units)} (${formatPercentage(percentage)})`;

            return (
              <React.Fragment key={value.cluster}>
                <Content component={ContentVariants.dt}>{id}</Content>
                <Content component={ContentVariants.dd}>{val}</Content>
              </React.Fragment>
            );
          }),
        ),
      )}
    </>
  ) : null;
};

export { CostSummaryClusters };
