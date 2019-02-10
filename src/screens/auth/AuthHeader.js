import React from 'react';
import Logo from '../images/Logo';
import { Box, Flex } from '@rebass/grid/emotion';
import { Link } from '@reach/router';

export default function AuthHeader() {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Box py="22px">
        <Link to="/">
          <Logo />
        </Link>
      </Box>
    </Flex>
  );
}
