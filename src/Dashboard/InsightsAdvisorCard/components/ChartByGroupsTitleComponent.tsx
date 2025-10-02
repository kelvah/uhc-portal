import React from 'react';

import { advisorBaseName } from '~/common/routing';

const categoryMapping: { [index: string]: number } = {
  service_availability: 1,
  performance: 2,
  fault_tolerance: 3,
  security: 4,
};

const ChartByGroupsTitleComponent = ({ data, index, x, y, style }: any) => {
  const { name, count, tags } = data[index];

  return (
    <text x={x} y={y} style={style} dy={5} data-testid="insights--items__category-title">
      <tspan x={x} y={y}>
        {name}:{' '}
        <a
          href={`${advisorBaseName}/recommendations?category=${categoryMapping[tags]}`}
          data-testid={tags}
        >
          {count}
        </a>
      </tspan>
    </text>
  );
};

export { ChartByGroupsTitleComponent };
