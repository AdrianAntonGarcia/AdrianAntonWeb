import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import ChangePass from '../pages/auth/ChangePass';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ResendValidation from '../pages/auth/ResendValidation';
import SendChangePassEmail from '../pages/auth/SendChangePassEmail';

const AuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/register" component={Register} />
      <Route exact path="/auth/changePass/:token" component={ChangePass} />
      <Route exact path="/auth/resendValidation" component={ResendValidation} />
      <Route
        exact
        path="/auth/sendChangePassEmail"
        component={SendChangePassEmail}
      />
      <Redirect to="/auth/login" />
    </Switch>
  );
};

export default connect(null, null, null, {
  pure: true,
})(AuthRouter);
