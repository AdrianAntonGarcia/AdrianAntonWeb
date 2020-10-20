import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { home } from '../components/home/home';
import { login } from '../components/login/login';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  return (
    <Router>
      <div id="divRouter">
        <Switch>
          <PublicRoute
            exact
            path="/login"
            component={login}
            isLoggedIn={false}
          />
          <PrivateRoute
            exact
            path="/"
            component={home}
            isLoggedIn={true}
          ></PrivateRoute>
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
};
