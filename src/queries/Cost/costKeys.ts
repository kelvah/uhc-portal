import { costService } from '~/services';

const costKeys = {
  all: ['cost'] as const,
  report: (baseKey: string, params?: Parameters<typeof costService.getReport>[0]) =>
    [baseKey, ...costKeys.all, 'report', { ...params }] as const,
  access: (baseKey: string, params?: Parameters<typeof costService.getUserAccess>[0]) =>
    [baseKey, ...costKeys.all, 'access', { ...params }] as const,
  sources: (baseKey: string, params?: Parameters<typeof costService.getSources>[0]) =>
    [baseKey, ...costKeys.all, 'sources', { ...params }] as const,
};

export { costKeys };
