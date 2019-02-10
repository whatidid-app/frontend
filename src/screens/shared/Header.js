import React from 'react';
import { Box, Flex } from '@rebass/grid/emotion';
import Logo from '../images/Logo';
import { Container, ProfileDropdown } from '../../patterns';
import { Link, Match } from '@reach/router';
import { darken } from 'polished';
import styled from '@emotion/styled';

const Nav = styled.nav`
  display: inline-block;
  margin-left: 55px;
  ul {
    display: flex;
  }
  ul li a {
    margin: 0 15px;
    font-weight: 500;
    font-size: 18px;
    text-decoration-line: underline;
  }
`;

const NavLink = styled(Link)`
  font-weight: 500;
  font-size: 12px;
  text-decoration-line: underline;
  color: #9aa5b1;
  ${({ active }) => active && 'color: #323f4b;'}
  &:hover,
  &:focus {
    color: ${() => darken(0.2, '#9AA5B1')};
  }
`;

const NavLinkActive = props => (
  <Match path={`${props.to}`}>
    {p => (
      <NavLink active={p.match} {...props}>
        {props.children}
      </NavLink>
    )}
  </Match>
);

export default function AuthHeader() {
  return (
    <Box
      css={{
        backgroundColor: '#ffffff',
        boxShadow: '0px 2px 4px rgba(154, 165, 177, 0.25)'
      }}>
      <Container>
        <Flex py="22px" alignItems="center" justifyContent="start">
          <Link to="/">
            <Logo />
          </Link>
          <Nav>
            <ul>
              <li>
                <NavLinkActive to="/">Home</NavLinkActive>
              </li>
              <li>
                <NavLinkActive to="/team">Team</NavLinkActive>
              </li>
              <li>
                <NavLinkActive to="/settings">Settings</NavLinkActive>
              </li>
            </ul>
          </Nav>
          <Box ml="auto">
            <ProfileDropdown image="https://randomuser.me/api/portraits/women/72.jpg" />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
