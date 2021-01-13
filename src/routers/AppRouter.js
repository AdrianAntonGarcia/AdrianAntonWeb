import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { home } from '../pages/home/home';
import { Login } from '../pages/login/Login';
import { Register } from '../pages/login/Register';
import { ResendValidation } from '../pages/login/ResendValidation';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { AuthFacade } from '../redux/facades/auth/authFacade';
import { Loading } from '../components/shared/Loading';

export const AppRouter = () => {
  const {
    authState: { logged, checking },
    comprobarLogin,
  } = AuthFacade();
  useEffect(() => {
    comprobarLogin();
  }, [comprobarLogin]);
  if (checking) {
    return <Loading />;
  } else {
    return (
      <Router>
        <Switch>
          <PublicRoute
            exact
            path="/login"
            component={Login}
            isLoggedIn={logged}
          />
          <PublicRoute
            exact
            path="/register"
            component={Register}
            isLoggedIn={logged}
          />
          <PublicRoute
            exact
            path="/resendValidation"
            component={ResendValidation}
            isLoggedIn={logged}
          />
          <PrivateRoute
            exact
            path="/"
            component={home}
            isLoggedIn={logged}
          ></PrivateRoute>
          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
};
