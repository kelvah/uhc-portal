import React from 'react';

import { render, screen } from '~/testUtils';

import LiveDateFormat from './LiveDateFormat';

describe('<LiveDateFormat />', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('1 Jan 2021 00:00:00 GMT').getTime());
  });

  it('displays "a few seconds ago" on initial render', () => {
    render(<LiveDateFormat date={new Date()} />);
    expect(screen.getByText('a few seconds ago')).toBeInTheDocument();
  });

  it('applies className to the Timestamp component', () => {
    render(<LiveDateFormat date={new Date()} className="pf-v6-u-font-size-md" />);
    const timestamp = screen.getByText('a few seconds ago');
    expect(timestamp).toHaveClass('pf-v6-u-font-size-md');
  });

  afterAll(() => {
    jest.useRealTimers();
  });
});
