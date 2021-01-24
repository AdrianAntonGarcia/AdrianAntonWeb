import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/home/Home';
import { connect } from 'react-redux';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { getAuth } from '../redux/selectors/auth/authSelectors';
import { comprobarLogin } from '../redux/actions/auth/authActions';
import AuthRouter from './AuthRouter';
import { Loading } from '../components/shared/Loading';

const AppRouter = ({ logged, comprobarLogin }) => {
  /**
   * Comprobamos si el usuario está logueado o no
   */
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    comprobarLogin().then(() => {
      setLoading(false);
    });
  }, [comprobarLogin]);

  if (loading) return <Loading />;
  else
    return (
      <Router>
        <Switch>
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isLoggedIn={logged}
          />
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
