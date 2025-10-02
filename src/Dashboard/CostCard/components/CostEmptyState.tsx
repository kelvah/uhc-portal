import React from 'react';

import {
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateVariant,
} from '@patternfly/react-core';

import ExternalLink from '~/components/common/ExternalLink';

import links from '../../../common/installLinks.mjs';

import { CostIcon } from './CostIcon';

const CostEmptyState = () => (
  <EmptyState
    variant={EmptyStateVariant.lg}
    titleText="Track your OpenShift spending!"
    icon={CostIcon}
    headingLevel="h2"
    className="pf-m-redhat-font"
  >
    <EmptyStateBody>
      Add an OpenShift Container Platform cluster to see a total cost breakdown of your pods by
      cluster, node, project, or labels.
    </EmptyStateBody>
    <EmptyStateFooter>
      <EmptyStateActions>
        <ExternalLink href={links.COSTMGMT_ADDING_OCP}>
          Add an OpenShift cluster to Cost Management
        </ExternalLink>
      </EmptyStateActions>
    </EmptyStateFooter>
  </EmptyState>
);

export { CostEmptyState };
