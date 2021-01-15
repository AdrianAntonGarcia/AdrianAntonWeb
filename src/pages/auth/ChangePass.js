import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  startCheckChangePass,
  checkChangePassTrue,
} from '../../redux/actions/auth/authActions';
import { getAuth } from '../../redux/selectors/auth/authSelectors';

const ChangePass = ({
  history,
  checkChangePass,
  startCheckChangePass,
  checkChangePassTrue,
  match: { params },
}) => {
  const { token } = params;
  console.log(checkChangePass);
  useEffect(() => {
    startCheckChangePass(token);
    return () => {
      checkChangePassTrue();
    };
  }, [startCheckChangePass, checkChangePassTrue, token]);

  if (checkChangePass === false) {
    checkChangePassTrue();
    history.push('/auth/login');
  }
  return (
    <div>
      <span>ChangePass page</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  const auth = getAuth(state);
  const { checkChangePass } = auth;
  return { checkChangePass };
};

export default connect(
  mapStateToProps,
  { startCheckChangePass, checkChangePassTrue },
  null,
  {
    pure: true,
  }
)(ChangePass);
