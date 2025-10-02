import { InsightsRuleCategories } from '~/components/clusters/ClusterDetailsMultiRegion/components/Insights/InsightsConstants';

const RULE_SEVERITIES: { [key: number]: string } = {
  1: 'Low',
  2: 'Moderate',
  3: 'Important',
  4: 'Critical',
};

const getSeverityName = (severityLevel: keyof typeof RULE_SEVERITIES): string =>
  RULE_SEVERITIES[severityLevel];

const groupTagHitsByGroups = (
  hits: Record<string, number> | undefined,
  groups?: InsightsRuleCategories[],
): { [index: string]: { count: number; tags: string } } | undefined =>
  groups
    ?.sort((a, b) => a.title.localeCompare(b.title))
    .reduce(
      (acc, { tags, title }) => ({
        ...acc,
        [title]: {
          count: tags.reduce((num, item) => num + (hits?.[item] ?? 0), 0),
          tags: tags.join(','),
        },
      }),
      {},
    );

export { getSeverityName, groupTagHitsByGroups };
