import React from 'react';

import { categoryMapping } from '~/components/dashboard/InsightsAdvisorCard/ChartByGroups';
import { checkAccessibility, render, screen, within } from '~/testUtils';

import { InsightsAdvisorCard } from './InsightsAdvisorCard';

describe('<InsightsAdvisorCard />', () => {
  describe('When no Advisor recommendations (no rule hits)', () => {
    it('Displays empty state', () => {
      // Act
      render(<InsightsAdvisorCard status="success" />);

      // Assert
      expect(
        screen.getByText(
          'This feature uses the Remote Health functionality of OpenShift Container Platform.',
          { exact: false },
        ),
      ).toBeInTheDocument();
    });
  });

  describe('When recommendations are available (rule hits)', () => {
    const overview = {
      clusters_hit: 3,
      hit_by_risk: {
        1: 1,
        2: 2,
        3: 10,
        4: 1,
      },
      hit_by_tag: {
        fault_tolerance: 2,
        performance: 4,
        security: 3,
        service_availability: 11,
      },
    };

    // Fails with   "Interactive controls must not be nested (nested-interactive)" error
    it.skip('is accessible', async () => {
      // Act
      const { container } = render(
        <InsightsAdvisorCard
          clustersHit={overview.clusters_hit}
          hitByRisk={overview.hit_by_risk}
          hitByTag={overview.hit_by_tag}
          status="success"
        />,
      );

      // Assert
      await checkAccessibility(container);
    });

    it('renders two charts', () => {
      // Act
      render(
        <InsightsAdvisorCard
          clustersHit={overview.clusters_hit}
          hitByRisk={overview.hit_by_risk}
          hitByTag={overview.hit_by_tag}
          status="success"
        />,
      );

      // Assert
      expect(screen.getByText('Advisor recommendations by severity')).toBeInTheDocument();
      expect(screen.getByText('Recommendations by category')).toBeInTheDocument();
    });

    it('renders single "View more" link to OCP Advisor', () => {
      // Act
      render(
        <InsightsAdvisorCard
          clustersHit={overview.clusters_hit}
          hitByRisk={overview.hit_by_risk}
          hitByTag={overview.hit_by_tag}
          status="success"
        />,
      );

      // Assert
      expect(screen.getByRole('link', { name: 'View more in Insights Advisor' })).toHaveAttribute(
        'href',
        '/openshift/insights/advisor',
      );
    });

    it('chart by risks has links to Advisor', () => {
      // Act
      render(
        <InsightsAdvisorCard
          clustersHit={overview.clusters_hit}
          hitByRisk={overview.hit_by_risk}
          hitByTag={overview.hit_by_tag}
          status="success"
        />,
      );

      // Assert
      // Currently there is no other way to easily identify this object
      const riskItems = screen.getAllByTestId('insights--items__risk-item');

      // four risks in total
      expect(riskItems).toHaveLength(4);
      riskItems.forEach(
        // check whether low risk is mapped to 1, moderate to 2, important to 3, critical to 4
        (item, index) => {
          const link = within(item).getByRole('link');
          expect(link).toHaveAttribute(
            'href',
            `/openshift/insights/advisor/recommendations?total_risk=${4 - index}`,
          );
        },
        //   ),
      );
    });

    it('chart by groups has links to Advisor', () => {
      // Act
      render(
        <InsightsAdvisorCard
          clustersHit={overview.clusters_hit}
          hitByRisk={overview.hit_by_risk}
          hitByTag={overview.hit_by_tag}
          status="success"
        />,
      );

      // Assert
      const titles = screen.getAllByTestId('insights--items__category-title');

      expect(titles).toHaveLength(4);
      titles.forEach((title) => {
        const link = within(title).getByRole('link');
        const category = link.getAttribute('data-testid') as string;

        expect(link).toHaveAttribute(
          'href',
          `/openshift/insights/advisor/recommendations?category=${(categoryMapping as any)[category]}`,
        );
      });
    });

    it('chart is displayed', () => {
      // Act
      render(
        <InsightsAdvisorCard
          clustersHit={overview.clusters_hit}
          hitByRisk={overview.hit_by_risk}
          hitByTag={overview.hit_by_tag}
          status="success"
        />,
      );

      // Assert
      expect(
        screen.getByRole('img', {
          name: /categories statistics/i,
        }),
      ).toBeInTheDocument();
    });
  });
});
