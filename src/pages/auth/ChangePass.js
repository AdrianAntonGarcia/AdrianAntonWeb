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

  useEffect(() => {
    if (checkChangePass === true) startCheckChangePass(token);
  }, [checkChangePass, startCheckChangePass, token]);

  const irLogin = () => {
    history.push('/auth/login');
    checkChangePassTrue();
  };

  if (checkChangePass) {
    return (
      <div>
        <span>ChangePass page</span>
      </div>
    );
  } else {
    return (
      <div>
        <span>No autorizado</span>
        <button onClick={irLogin}>Ir login</button>
      </div>
    );
  }
};

/**
 * Devolvemos el estado del auth
 * @param {*} state
 */
const mapStateToProps = (state) => {
  const auth = getAuth(state);
  const { checkChangePass } = auth;
  return { checkChangePass };
};

/**
 * Si ha cambiado, no devolvemos para que deje de actualizarse
 * @param {*} next
 * @param {*} prev
 */
// const areStatesEqual = (next, prev) => {
//   console.log(next, prev);
//   return next.auth.checkChangePass !== prev.auth.checkChangePass;
// };
export default connect(mapStateToProps, {
  startCheckChangePass,
  checkChangePassTrue,
})(ChangePass);
