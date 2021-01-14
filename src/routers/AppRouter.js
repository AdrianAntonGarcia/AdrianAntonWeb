import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/home/home';
import { connect } from 'react-redux';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { Loading } from '../components/shared/Loading';
import { getAuth } from '../redux/selectors/auth/authSelectors';
import { comprobarLogin } from '../redux/actions/auth/authActions';
import { AuthRouter } from './AuthRouter';

const AppRouter = ({ auth: { checking, logged }, comprobarLogin }) => {
  useEffect(() => {
    comprobarLogin();
  }, [comprobarLogin]);
  if (checking) {
    return <Loading />;
  }
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isLoggedIn={logged}
          />
          <PrivateRoute
            exact
            path="/"
            component={Home}
            isLoggedIn={logged}
          ></PrivateRoute>
          <Redirect to="/auth" />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  const auth = getAuth(state);
  return { auth };
};

export default connect(mapStateToProps, { comprobarLogin }, null, {
  pure: false,
})(AppRouter);
