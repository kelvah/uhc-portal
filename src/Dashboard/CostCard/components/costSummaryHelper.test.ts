import { CostReport } from '~/Dashboard/CostCard/costTypes';

import { formatCurrency, formatPercentage, getTotal } from './costSummaryHelpers';

describe('formatCurrency', () => {
  it.each([
    ['undefined value, undefined unit -> $0', undefined, undefined, '$0.00'],
    ['100 EUR -> €100', 100, 'EUR', '€100.00'],
    ['50.5 GBP -> £50.50', 50.5, 'GBP', '£50.50'],
    ['0 USD -> $0.00', 0, 'USD', '$0.00'],
  ])('%p', (_title, value, unit, expected) => expect(formatCurrency(value, unit)).toBe(expected));
});

describe('getTotal', () => {
  it('returns formatted total and units when report is falsy', () => {
    const report = undefined;
    expect(getTotal(report)).toBe('$0.00');
  });

  it('returns formatted total and units when report.meta.total.cost.total is falsy', () => {
    const report: CostReport = {
      meta: {
        total: {
          cost: {
            total: undefined,
          },
        },
      },
      data: [],
    };
    expect(getTotal(report)).toBe('$0.00');
  });

  it('returns formatted total and units when report.meta.total.cost.total is truthy', () => {
    const report: CostReport = {
      meta: {
        total: {
          cost: {
            total: {
              value: 100,
              units: 'EUR',
            },
          },
        },
      },
      data: [],
    };
    expect(getTotal(report)).toBe('€100.00');
  });

  it('returns formatted total and units with default values when units are not provided', () => {
    const report: CostReport = {
      meta: {
        total: {
          cost: {
            total: {
              value: 50,
            },
          },
        },
      },
      data: [],
    };
    expect(getTotal(report)).toBe('$50.00');
  });
});

describe('formatPercentage', () => {
  it.each([
    ['undefined value -> 0%', undefined, '0%'],
    ['0.5 value -> 50%', 0.5, '50%'],
    ['0 value -> 0%', 0, '0%'],
    ['negative value, negative percentage', -0.25, '-25%'],
    ['0.75 value -> 75%', 0.75, '75%'],
  ])('%p', (_title, value, expected) => expect(formatPercentage(value)).toBe(expected));
});
