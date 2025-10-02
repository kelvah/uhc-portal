import React from 'react';

import { EmptyState, EmptyStateBody } from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons/dist/esm/icons/search-icon';

import ExternalLink from '~/components/common/ExternalLink';

import links from '../../../common/installLinks.mjs';

const InsightsAdvisorCardEmpty = () => (
  <EmptyState
    isFullHeight
    titleText="No Advisor recommendations"
    icon={SearchIcon}
    headingLevel="h4"
  >
    <EmptyStateBody>
      This feature uses the Remote Health functionality of OpenShift Container Platform. For further
      details about Insights, see the{' '}
      <ExternalLink href={links.REMOTE_HEALTH_INSIGHTS}>OpenShift documentation</ExternalLink>.
    </EmptyStateBody>
  </EmptyState>
);

export { InsightsAdvisorCardEmpty };
