import React from 'react';
import UserAuthRoute from './authRoutes/UserAuthRoute';
import SimpleAuthRoute from './authRoutes/SimpleAuthRoute';
import { Router } from '@reach/router';

import NotFound from './screens/NotFound';
import Home from './screens/home/Home';
import Team from './screens/team/Team';
import Settings from './screens/settings/Settings';
import SignUp from './screens/auth/SignUp';
import SignIn from './screens/auth/SignIn';
import SignOut from './screens/auth/SignOut';
import ForgotPassword from './screens/auth/ForgotPassword';
import ResetPassword from './screens/auth/ResetPassword';

export default function Routes() {
  return (
    <Router>
      <SimpleAuthRoute path="/register" redirectAuth="/" component={SignUp} />
      <SimpleAuthRoute path="/login" redirectAuth="/" component={SignIn} />
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
      <UserAuthRoute component={SignOut} path="/logout" />
      <UserAuthRoute component={Home} path="/" />
      <UserAuthRoute component={Team} path="/team" />
      <UserAuthRoute component={Settings} path="/settings" />
      <SimpleAuthRoute path="*" redirectAuth="/" component={NotFound} />
    </Router>
  );
}
