import React from 'react';
import AuthRoute from './AuthRoute';
import { Redirect } from '@reach/router';
import { Container } from '../patterns';
import Header from '../screens/shared/Header';

export default function UserAuthRoute(props) {
  const { component: Component } = props;

  return (
    <AuthRoute {...props}>
      {(props, user) => (
        <>
          {user && <Header />}
          <Container>
            {!user && <Redirect noThrow to="/login" from={props.path} />}
            {user && <Component {...props} user={user} />}
          </Container>
        </>
      )}
    </AuthRoute>
  );
}
