import React from 'react';
import AuthRoute from './AuthRoute';

export default function GuestAuthRoute(props) {
  const { component: Component } = props;

  return (
    <AuthRoute {...props}>
      {(props, user) => (
        <>
          <Component {...props} user={user} />
        </>
      )}
    </AuthRoute>
  );
}
