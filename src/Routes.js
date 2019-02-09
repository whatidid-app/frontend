import React from 'react';
import GuestAuthRoute from './authRoutes/GuestAuthRoute';
import UserAuthRoute from './authRoutes/UserAuthRoute';
import SimpleAuthRoute from './authRoutes/SimpleAuthRoute';
import { Router } from '@reach/router';

import App from './screens/App';
import NotFound from './screens/NotFound';
import SignUp from './screens/auth/SignUp';
import SignIn from './screens/auth/SignIn';
import ForgotPassword from './screens/auth/ForgotPassword';
import ResetPassword from './screens/auth/ResetPassword';

const LoggedIn = () => 'I am logged in';

export default function Routes() {
  return (
    <Router>
      <GuestAuthRoute component={App} path="/" />
      <UserAuthRoute component={LoggedIn} path="/private" />
      <SimpleAuthRoute path="/signup" redirectAuth="/" component={SignUp} />
      <SimpleAuthRoute path="/signin" redirectAuth="/" component={SignIn} />
      <SimpleAuthRoute
        path="/forgot-password"
        redirectAuth="/"
        component={ForgotPassword}
      />
      <SimpleAuthRoute
        path="/reset-password"
        redirectAuth="/"
        component={ResetPassword}
      />
      <SimpleAuthRoute path="*" redirectAuth="/" component={NotFound} />
    </Router>
  );
}
