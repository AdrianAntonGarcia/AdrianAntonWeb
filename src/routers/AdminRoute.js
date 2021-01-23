import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AdminRoute = ({ isAdmin, component: Component, ...rest }) => {
  console.log(isAdmin);
  return (
    <Route
      {...rest}
      component={(props) =>
        isAdmin === 'Admin_role' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/home/inicio" />
        )
      }
    />
  );
};
