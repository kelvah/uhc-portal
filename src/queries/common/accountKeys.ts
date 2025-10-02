const accountKeys = {
  all: ['account'] as const,
  organization: (baseKey: string) => [baseKey, ...accountKeys.all, 'organization'] as const,
};

export { accountKeys as dashboardKeys };
