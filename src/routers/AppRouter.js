import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { home } from '../components/home/home';
import { Login } from '../components/login/Login';
import { Register } from '../components/login/Register';
import { ResendValidation } from '../components/login/ResendValidation';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  const { idUser } = useSelector((state) => state.auth);
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
