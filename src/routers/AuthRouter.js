import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/login/Register';
import ResendValidation from '../pages/login/ResendValidation';
import { SendChangePassEmail } from '../pages/login/SendChangePassEmail';

export const AuthRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/register" component={Register} />
        <Route
          exact
          path="/auth/resendValidation"
          component={ResendValidation}
        />
        <Route
          exact
          path="/auth/sendChangePassEmail"
          component={SendChangePassEmail}
        />
        <Redirect to="/auth/login" />
      </Switch>
    </div>
  );
};
