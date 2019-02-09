import React from 'react';
import AuthRoute from './AuthRoute';
import { Redirect } from '@reach/router';

export default function UserAuthRoute(props) {
  const { component: Component } = props;

  return (
    <AuthRoute {...props}>
      {(props, user) => (
        <>
          {!user && <Redirect noThrow to="/signin" from={props.path} />}
          <Component {...props} user={user} />
        </>
      )}
    </AuthRoute>
  );
}
