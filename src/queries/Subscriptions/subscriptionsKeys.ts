import { accountsService } from '~/services';

const subscriptionsKeys = {
  all: ['subscriptions'] as const,
  get: (baseKey: string, params?: Parameters<typeof accountsService.getSubscriptions>[0]) =>
    [baseKey, ...subscriptionsKeys.all, 'get', { ...params }] as const,
};

export { subscriptionsKeys };
