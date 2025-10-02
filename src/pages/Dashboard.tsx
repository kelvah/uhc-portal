import React, { useMemo } from 'react';

import { Grid, GridItem, PageSection, Split, SplitItem, Title } from '@patternfly/react-core';
import { PageHeader } from '@redhat-cloud-services/frontend-components/PageHeader';

import { AppPage } from '~/components/App/AppPage';
import { ClustersCard } from '~/Dashboard/ClustersCard/ClustersCard';
import { ClustersWithIssuesCard } from '~/Dashboard/ClustersWithIssuesCard/ClustersWithIssuesCard';
import { ClustersWithIssuesTableCard } from '~/Dashboard/ClustersWithIssuesTableCard/ClustersWithIssuesTableCard';
import { CostCard } from '~/Dashboard/CostCard/CostCard';
import { CostReport } from '~/Dashboard/CostCard/costTypes';
import { CPUMemoryUtilizationCard } from '~/Dashboard/CPUMemoryUtilizationCard/CPUMemoryUtilizationCard';
import { ExpiredTrialsCard } from '~/Dashboard/ExpiredTrialsCard/ExpiredTrialsCard';
import { InsightsAdvisorCard } from '~/Dashboard/InsightsAdvisorCard/InsightsAdvisorCard';
import { TelemetryCard } from '~/Dashboard/TelemetryCard/TelemetryCard';
import { UpdateStatusCard } from '~/Dashboard/UpdateStatusCard/UpdateStatusCard';
import { useFetchAccountOrganization } from '~/queries/common/useFetchAccountOrganization';
import { useFetchReportCost } from '~/queries/Cost/useFetchReportCost';
import { useFetchSources } from '~/queries/Cost/useFetchSources';
import { useFetchUserAccess } from '~/queries/Cost/useFetchUserAccess';
import { useFetchDashboardSummary } from '~/queries/Dashboard/useFetchDashboardSummary';
import { useFetchOrganizationInsights } from '~/queries/Dashboard/useFetchOrganizationInsights';
import { useFetchUnhealthyClusters } from '~/queries/Dashboard/useFetchUnhealthyClusters';
import {
  invalidateGetSubscriptions,
  useFetchGetSubscriptions,
} from '~/queries/Subscriptions/useFetchGetSubscriptions';
// eslint-disable-next-line camelcase
import { SubscriptionCommonFieldsSupport_level } from '~/types/accounts_mgmt.v1';

import './Dashboard.scss';

const PAGE_TITLE = 'Overview | Red Hat OpenShift Cluster Manager';
const PARAMS = { type: 'OCP' };
const REACT_QUERY_BASE_KEY = 'dashboard';

const Dashboard = () => {
  const { data: reportCost, status: reportCostStatus } = useFetchReportCost(REACT_QUERY_BASE_KEY);
  const { data: sources, status: sourcesStatus } = useFetchSources(REACT_QUERY_BASE_KEY, PARAMS);
  const { data: userAccess, status: userAccessStatus } = useFetchUserAccess(
    REACT_QUERY_BASE_KEY,
    PARAMS,
  );
  const { data: accountOrganization } = useFetchAccountOrganization(REACT_QUERY_BASE_KEY);

  const { data: dashboardSummary, status: dashboardSummaryStatus } = useFetchDashboardSummary(
    REACT_QUERY_BASE_KEY,
    accountOrganization?.id,
  );
  const {
    data: subscriptions,
    status: subscriptionsStatus,
    pagination: subscriptionsPagination,
    updatePagination: updateSubscriptionsPagination,
  } = useFetchGetSubscriptions(REACT_QUERY_BASE_KEY, {
    // eslint-disable-next-line camelcase
    filter: `support_level='${SubscriptionCommonFieldsSupport_level.None}' AND status NOT IN ('Deprovisioned', 'Archived')`,
  });

  const {
    data: unhealthyClusters,
    status: unhealthyClustersStatus,
    pagination: unhealthyClustersResponsePagination,
    updatePagination: updateUnhealthyClustersPagination,
  } = useFetchUnhealthyClusters(REACT_QUERY_BASE_KEY, accountOrganization?.id!, {
    order: 'display_name asc',
  });

  const { data: organizationInsights, status: organizationInsightsStatus } =
    useFetchOrganizationInsights(REACT_QUERY_BASE_KEY);

  const showCostCard = useMemo(
    () =>
      userAccess?.data !== undefined &&
      ((Array.isArray(userAccess.data) && userAccess.data.filter((e) => e.access === true)) ||
        (userAccess.data as any) === true),
    [userAccess?.data],
  );
  const isCostInfoLoading = useMemo(
    () => [reportCostStatus, sourcesStatus, userAccessStatus].includes('pending'),
    [reportCostStatus, sourcesStatus, userAccessStatus],
  );

  return (
    <AppPage title={PAGE_TITLE}>
      <PageHeader>
        <Split hasGutter>
          <SplitItem>
            <Title
              headingLevel="h1"
              size="2xl"
              className="page-title"
              widget-type="InsightsPageHeaderTitle"
            >
              Dashboard
            </Title>
          </SplitItem>
          <SplitItem isFilled />
          <SplitItem>Placeholder for actions</SplitItem>
        </Split>
      </PageHeader>
      <PageSection>
        <Grid hasGutter>
          <GridItem md={3}>
            <ClustersCard
              numberOfClusters={dashboardSummary.totalClusters?.value ?? 0}
              status={dashboardSummaryStatus}
            />
          </GridItem>
          <GridItem md={9} rowSpan={2}>
            <CPUMemoryUtilizationCard {...dashboardSummary} status={dashboardSummaryStatus} />
          </GridItem>
          <GridItem md={3}>
            <ClustersWithIssuesCard
              totalConnectedClusters={dashboardSummary.totalConnectedClusters?.value ?? 0}
              totalUnhealthyClusters={dashboardSummary.totalUnhealthyClusters?.value ?? 0}
              status={dashboardSummaryStatus}
            />
          </GridItem>
          <GridItem md={6}>
            <ClustersWithIssuesTableCard
              clusters={unhealthyClusters}
              status={unhealthyClustersStatus}
              pagination={unhealthyClustersResponsePagination}
              onPaginationChange={updateUnhealthyClustersPagination}
            />
          </GridItem>
          <GridItem md={6}>
            <InsightsAdvisorCard
              clustersHit={organizationInsights?.clusters_hit}
              hitByRisk={organizationInsights?.hit_by_risk}
              hitByTag={organizationInsights?.hit_by_tag}
              status={organizationInsightsStatus}
            />
          </GridItem>
          <GridItem md={6}>
            <TelemetryCard
              totalClusters={dashboardSummary?.totalClusters?.value ?? 0}
              totalConnectedClusters={dashboardSummary?.totalConnectedClusters?.value ?? 0}
              status={dashboardSummaryStatus}
            />
          </GridItem>
          {showCostCard ? (
            <GridItem md={6}>
              <CostCard
                report={reportCost! as unknown as CostReport}
                sources={sources!}
                isLoading={isCostInfoLoading}
              />
            </GridItem>
          ) : null}
          <GridItem md={6}>
            <UpdateStatusCard
              upToDateNumberOfClusters={dashboardSummary?.upToDateNumberOfClusters?.value ?? 0}
              updatableNumberOfClusters={dashboardSummary?.updatableNumberOfClusters?.value ?? 0}
              status={dashboardSummaryStatus}
            />
          </GridItem>
          <GridItem>
            <ExpiredTrialsCard
              subscriptions={subscriptions}
              status={subscriptionsStatus}
              pagination={subscriptionsPagination}
              onPaginationChange={updateSubscriptionsPagination}
              invalidateSubscriptions={() => invalidateGetSubscriptions(REACT_QUERY_BASE_KEY)}
            />
          </GridItem>
        </Grid>
      </PageSection>
    </AppPage>
  );
};

export { Dashboard };
