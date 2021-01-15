import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ChangePass from '../pages/auth/ChangePass';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ResendValidation from '../pages/auth/ResendValidation';
import SendChangePassEmail from '../pages/auth/SendChangePassEmail';

export const AuthRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/register" component={Register} />
        <Route exact path="/auth/changePass/:token" component={ChangePass} />
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
