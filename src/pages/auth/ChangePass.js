import React, { useEffect, useState } from 'react';
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
  const [mostrar, setMostrar] = useState(false);
  console.log(mostrar);
  useEffect(() => {
    startCheckChangePass(token).then((res) => {
      setMostrar(res);
    });
    return () => {
      checkChangePassTrue();
    };
  }, [
    startCheckChangePass,
    checkChangePassTrue,
    token,
    checkChangePass,
    history,
  ]);

  if (mostrar) {
    return (
      <div>
        <span>ChangePass page</span>
      </div>
    );
  } else {
    return (
      <div>
        <span>No autorizado</span>
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
 * Actualiza el componente solo si cambia el checkChangePass
 * @param {*} next
 * @param {*} prev
 */
const areStatesEqual = (next, prev) => {
  console.log(next, prev);
  return next.auth.checkChangePass !== prev.auth.checkChangePass;
};
export default connect(
  mapStateToProps,
  { startCheckChangePass, checkChangePassTrue },
  null,
  {
    pure: true,
    areStatesEqual,
  }
)(ChangePass);
