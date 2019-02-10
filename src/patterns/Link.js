import React from 'react';
import styled from '@emotion/styled';
import { darken } from 'polished';
import { Link as RouterLink, Match } from '@reach/router';

const Link = styled(RouterLink)`
  font-weight: 500;
  font-size: 12px;
  text-decoration-line: underline;
  color: #647acb;
  &:hover,
  &:focus {
    color: ${() => darken(0.2, '#647acb')};
  }
`;

export default props => (
  <Match path={`${props.to}`}>
    {p => <Link {...props}>{props.children}</Link>}
  </Match>
);
