import React from 'react';

import { Flex, FlexItem, Title } from '@patternfly/react-core';

import { advisorBaseName } from '~/common/routing';

import { getSeverityName } from './utils/InsightsAdvisorCardHelper';
import { InfoPopover } from './InfoPopover';

type ChartByRisksProps = {
  hitByRisk?: Record<string, number>;
};

function ChartByRisks({ hitByRisk }: ChartByRisksProps) {
  return (
    <Flex direction={{ default: 'column' }}>
      <Flex spacer={{ default: 'spacerLg' }}>
        <FlexItem>
          <Title size="lg" headingLevel="h2">
            Advisor recommendations by severity
          </Title>
        </FlexItem>
        <FlexItem>
          <InfoPopover />
        </FlexItem>
      </Flex>
      <FlexItem
        spacer={{ default: 'spacerLg' }}
        style={{ marginLeft: 'var(--pf-v5-global--spacer--md)' }}
      >
        <Flex
          justifyContent={{ default: 'justifyContentFlexStart' }}
          spaceItems={{
            sm: 'spaceItemsXl',
            md: 'spaceItemsLg',
            lg: 'spaceItems2xl',
            '2xl': 'spaceItems4xl',
          }}
        >
          {Object.entries({
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            ...hitByRisk,
          })
            .reverse()
            .map(([riskNumber, count]) => (
              <FlexItem key={riskNumber} data-testid="insights--items__risk-item">
                <Flex
                  direction={{ default: 'column' }}
                  alignItems={{ default: 'alignItemsCenter' }}
                  spaceItems={{ default: 'spaceItemsNone' }}
                >
                  <FlexItem>
                    <Title size="2xl" headingLevel="h1">
                      <a href={`${advisorBaseName}/recommendations?total_risk=${riskNumber}`}>
                        {count}
                      </a>
                    </Title>
                  </FlexItem>
                  <FlexItem>{getSeverityName(+riskNumber)}</FlexItem>
                </Flex>
              </FlexItem>
            ))}
        </Flex>
      </FlexItem>
    </Flex>
  );
}

export { ChartByRisks };
