import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from '@reach/router';

const GET_CURRENT_USER = gql`
  {
    viewer {
      id
      name
      email
      currentTeam {
        slug
        name
      }
    }
  }
`;

export default class AuthRoute extends Component {
  signOut = () => {
    try {
      if (localStorage.getItem('auth_headers') !== null) {
        const { uid, client } = JSON.parse(
          localStorage.getItem('auth_headers')
        );
      }
    } catch (e) {
      localStorage.removeItem('auth_headers');
    }
  };

  skipAuthCheck = () => {
    try {
      if (localStorage.getItem('auth_headers') !== null) {
        JSON.parse(localStorage.getItem('auth_headers'));
        return false;
      }
      return true;
    } catch (e) {
      return true;
    }
  };

  render() {
    const { redirectAuth, path, children } = this.props;

    return this.skipAuthCheck() ? (
      children(this.props, null)
    ) : (
      <Query query={GET_CURRENT_USER}>
        {({ loading, error, data = { viewer: null } }) => {
          if (loading) return <div>...loading</div>;
          if (data.viewer && redirectAuth)
            return <Redirect noThrow from={path} to={redirectAuth} />;
          return children(this.props, data.viewer);
        }}
      </Query>
    );
  }
}
