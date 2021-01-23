import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        !isLoggedIn ? <Component {...props} /> : <Redirect to="/home" />
      }
    />
  );
};
