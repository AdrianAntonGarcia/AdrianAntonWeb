import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/home/home';
import Login from '../pages/login/Login';
import { connect } from 'react-redux';
import Register from '../pages/login/Register';
import { ResendValidation } from '../pages/login/ResendValidation';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { Loading } from '../components/shared/Loading';
import { getAuth } from '../redux/selectors/auth/authSelectors';
import { comprobarLogin } from '../redux/actions/auth/authActions';

const AppRouter = ({ auth: { checking, logged }, comprobarLogin, history }) => {
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
            history={history}
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
            component={Home}
            isLoggedIn={logged}
          ></PrivateRoute>
          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
};

const mapStateToProps = (state) => {
  const auth = getAuth(state);
  return { auth };
};

export default connect(mapStateToProps, { comprobarLogin }, null, {
  pure: false,
})(AppRouter);
