/* eslint-env jest */

import React from 'react';
import { render } from 'react-testing-library';

import App from '../App';

describe('With React Testing Library', () => {
  it('Shows "test"', () => {
    const { getByText } = render(<App />);

    expect(getByText('test')).not.toBeNull();
  });
});

describe('With React Testing Library Snapshot', () => {
  it('Should match Snapshot', () => {
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });
});
