// We have a problem with cost report coming from spec as data cannot have properties (?!)
// ReportCost: components['schemas']['Report'] & {
//   data: Record<string, never>[];
// };
import { SchemaReport, SchemaReportMetaTotalItem } from '~/types/cost-management.v1';

export type CostReport = {
  data: { clusters: ReportCluster[] }[];
  meta?: SchemaReport['meta'];
  links?: SchemaReport['links'];
};

type ReportClusterValue = {
  clusters?: string[];
  cluster?: string;
  cost?: SchemaReportMetaTotalItem;
};

export type ReportCluster = {
  values: ReportClusterValue[];
};
