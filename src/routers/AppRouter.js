import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/home/home';
import { connect } from 'react-redux';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { getAuth } from '../redux/selectors/auth/authSelectors';
import { comprobarLogin } from '../redux/actions/auth/authActions';
import AuthRouter from './AuthRouter';

const AppRouter = ({ logged, comprobarLogin }) => {
  /**
   * Comprobamos si el usuario está logueado o no
   */
  useEffect(() => {
    comprobarLogin();
  }, [comprobarLogin]);
  return (
    <Router>
      <Switch>
        <PublicRoute path="/auth" component={AuthRouter} isLoggedIn={logged} />
        <PrivateRoute
          path="/home"
          component={Home}
          isLoggedIn={logged}
        ></PrivateRoute>
        <Redirect to="/auth" />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => {
  const auth = getAuth(state);
  const { checking, logged } = auth;
  return { checking, logged };
};
/**
 * Si devuelve true, el mapStateToProps no es llamado
 * @param {*} next
 * @param {*} prev
 */
const areStatesEqual = (next, prev) => {
  return next.auth.logged === prev.auth.logged;
};
export default connect(mapStateToProps, { comprobarLogin }, null, {
  pure: true,
  areStatesEqual: areStatesEqual,
})(AppRouter);
