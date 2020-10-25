import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { home } from '../components/home/home';
import { Login } from '../components/login/Login';
import { Register } from '../components/login/Register';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/login" component={Login} isLoggedIn={false} />

        <PublicRoute
          exact
          path="/register"
          component={Register}
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
    </Router>
  );
};
