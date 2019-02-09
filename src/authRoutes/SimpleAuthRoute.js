import React from 'react';
import AuthRoute from './AuthRoute';

export default class SimpleAuthRoute extends React.Component {
  render() {
    const { component: Component, ...props } = this.props;
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
}