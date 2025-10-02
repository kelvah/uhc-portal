import React from 'react';

import { Card, CardBody, CardFooter, CardTitle, Title } from '@patternfly/react-core';

import { ocmBaseName } from '~/common/routing';
import { CostCardSkeleton } from '~/Dashboard/CostCard/components/CostCardSkeleton';
import { CostEmptyState } from '~/Dashboard/CostCard/components/CostEmptyState';
import { CostSummary } from '~/Dashboard/CostCard/components/CostSummary';
import { SchemaSourcePagination } from '~/types/cost-management.v1';
import { CostReport } from '~/Dashboard/CostCard/costTypes';

import './CostCard.scss';

type CostCardProps = {
  sources: SchemaSourcePagination;
  report: CostReport;
  isLoading: boolean;
};

const CostCard = ({ sources, report, isLoading }: CostCardProps) => {
  const hasSources = sources?.meta?.count !== 0;

  return (
    <Card className="ocm--cost-card">
      <CardTitle>
        <Title size="lg" headingLevel="h2">
          Cost Management
        </Title>
      </CardTitle>
      <CardBody className="ocm--cost-card__body">
        {(() => {
          switch (true) {
            case isLoading:
              return <CostCardSkeleton />;
            case hasSources:
              return <CostSummary report={report} />;
            default:
              return <CostEmptyState />;
          }
        })()}
      </CardBody>

      {hasSources ? (
        <CardFooter>
          <a href={`${ocmBaseName}/cost-management`}>View more in Cost management</a>
        </CardFooter>
      ) : null}
    </Card>
  );
};

export { CostCard };
