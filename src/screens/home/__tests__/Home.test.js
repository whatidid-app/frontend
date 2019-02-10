/* eslint-env jest */

import React from 'react';
import { render } from 'react-testing-library';

import Home from '../Home';

describe('With React Testing Library', () => {
  it('Shows "test"', () => {
    const { getByText } = render(<Home />);

    expect(getByText('Home Page')).not.toBeNull();
  });
});

describe('With React Testing Library Snapshot', () => {
  it('Should match Snapshot', () => {
    const { asFragment } = render(<Home />);

    expect(asFragment()).toMatchSnapshot();
  });
});
