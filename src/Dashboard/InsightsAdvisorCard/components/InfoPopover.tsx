import React from 'react';

import { Icon, Popover } from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons/dist/esm/icons/help-icon';

import ExternalLink from '~/components/common/ExternalLink';

import links from '../../../common/installLinks.mjs';

const InfoPopover = () => (
  <Popover
    aria-label="What is Insights?"
    position="left"
    maxWidth="25rem"
    enableFlip
    bodyContent={
      <>
        <p>
          Insights identifies and prioritizes risks to security, performance, availability, and
          stability of your clusters.
        </p>
        <p>
          This feature uses the Remote Health functionality of OpenShift Container Platform. For
          further details about Insights, see the{' '}
          <ExternalLink href={links.REMOTE_HEALTH_INSIGHTS}>OpenShift documentation</ExternalLink>.
        </p>
      </>
    }
  >
    <Icon>
      <HelpIcon />
    </Icon>
  </Popover>
);

export { InfoPopover };
