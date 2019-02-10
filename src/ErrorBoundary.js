import * as Sentry from '@sentry/browser';
import React, { Component } from 'react';

if (process.env.REACT_APP_ENVIRONMENT === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN
  });
}

// should have been called before using it here
// ideally before even rendering your react app

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state.error) {
      //render fallback UI
      return (
        <button onClick={() => Sentry.showReportDialog()}>
          Report feedback
        </button>
      );
    } else {
      //when there's not an error, render children untouched
      return this.props.children;
    }
  }
}
