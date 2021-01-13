import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/shared/Navbar';
import { getAuth } from '../../redux/selectors/auth/authSelectors';
import { checkingTrue } from '../../redux/actions/auth/authActions';

const Home = ({ auth, history }) => {
  //checkingTrue();
  console.log(history);
  return (
    <div>
      <Navbar history={history} />
    </div>
  );
};

const mapStateToProps = (state) => {
  const auth = getAuth(state);
  return { auth };
};

export default connect(mapStateToProps, { checkingTrue }, null, {
  pure: false,
})(Home);
