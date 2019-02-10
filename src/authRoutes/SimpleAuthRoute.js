import React from 'react';
import AuthRoute from './AuthRoute';
import AuthHeader from '../screens/auth/AuthHeader';
import { Container, Center, Alert } from '../patterns';

export default function SimpleAuthRoute(props) {
  const { component: Component } = props;

  return (
    <AuthRoute {...props}>
      {(props, user) => (
        <>
          <Alert />
          <Container>
            <AuthHeader />
            <Center>
              <Component {...props} user={user} />
            </Center>
          </Container>
        </>
      )}
    </AuthRoute>
  );
}
