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

    if (checkChangePass === false) {
      history.push('/auth/login');
      checkChangePassTrue();
    }
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
