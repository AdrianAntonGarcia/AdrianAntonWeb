import React from 'react';

import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { home } from '../pages/home/home';
import { Login } from '../pages/login/Login';
import { Register } from '../pages/login/Register';
import { ResendValidation } from '../pages/login/ResendValidation';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { AuthFacade } from '../redux/facades/auth/auth';

export const AppRouter = () => {
  const {
    authState: { idUser },
  } = AuthFacade();
  return (
    <Router>
      <Switch>
        <PublicRoute
          exact
          path="/login"
          component={Login}
          isLoggedIn={!!idUser}
        />
        <PublicRoute
          exact
          path="/register"
          component={Register}
          isLoggedIn={!!idUser}
        />
        <PublicRoute
          exact
          path="/resendValidation"
          component={ResendValidation}
          isLoggedIn={!!idUser}
        />
        <PrivateRoute
          exact
          path="/"
          component={home}
          isLoggedIn={!!idUser}
        ></PrivateRoute>
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};
