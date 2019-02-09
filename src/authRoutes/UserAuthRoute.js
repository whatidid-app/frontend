import React, { Component } from 'react';
import AuthRoute from './AuthRoute';
import { Redirect } from '@reach/router';

export default class UserAuthRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props;
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
}
