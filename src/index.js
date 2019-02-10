import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import ErrorBoundary from './ErrorBoundary';
import LogRocket from 'logrocket';

if (process.env.REACT_APP_ENVIRONMENT === 'production') {
  LogRocket.init('kstmwr/whatididapp');
}

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_API_ROOT_URL}/graphql`
});

const authLink = setContext((_, { headers }) => {
  let authHeaders = {};
  try {
    if (localStorage.getItem('auth_headers') !== null) {
      authHeaders = JSON.parse(localStorage.getItem('auth_headers'));
    }
  } catch (e) {
    authHeaders = {};
  }

  return {
    headers: {
      ...headers,
      ...authHeaders
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </Suspense>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
