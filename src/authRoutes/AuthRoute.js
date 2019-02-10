import React from 'react';
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

const skipAuthCheck = () => {
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

export default function AuthRoute(props) {
  const { redirectAuth, path, children } = props;
  return skipAuthCheck() ? (
    children(props, null)
  ) : (
    <Query query={GET_CURRENT_USER}>
      {({ loading, error, data = { viewer: null } }) => {
        if (loading) return null;
        if (data.viewer && redirectAuth)
          return <Redirect noThrow from={path} to={redirectAuth} />;
        return children(props, data.viewer);
      }}
    </Query>
  );
}
