import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm/useForm';

import {
  startCheckChangePass,
  checkChangePassTrue,
  startChangingPass,
} from '../../redux/actions/auth/authActions';
import { getAuth } from '../../redux/selectors/auth/authSelectors';

const ChangePass = ({
  history,
  checkChangePass,
  startCheckChangePass,
  checkChangePassTrue,
  startChangingPass,
  match: { params },
}) => {
  const [values, handleInputChange] = useForm({
    password: '',
    password2: '',
  });
  const { password, password2 } = values;
  const { token } = params;
  const [, setUid] = useState(null);
  useEffect(() => {
    if (checkChangePass === true) {
      startCheckChangePass(token).then(setUid);
    }
  }, [checkChangePass, startCheckChangePass, token]);

  const irLogin = () => {
    history.push('/auth/login');
    checkChangePassTrue();
  };

  const submitLogin = (e) => {
    e.preventDefault();
    if (password !== password2) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }
    if (password.length < 6) {
      Swal.fire(
        'Error',
        'Las contraseña debe tener al menos 6 caracteres',
        'error'
      );
      return;
    }
    startChangingPass(password, token).then((resultado) => {
      if (resultado === true) {
        Swal.fire(
          'Contraseña cambiada',
          'Por favor, haga login con su nueva contraseña',
          'success'
        );
        history.push('/login');
      }
    });
  };

  if (checkChangePass) {
    return (
      <form className="form-login" onSubmit={submitLogin}>
        <div className="row mb-5 ">
          <label className="col h1 text-center">AdriWeb - Change Pass</label>
        </div>
        <hr />
        <br />
        <div className="row mb-3 ">
          <label className="col-12 col-form-label">
            Introduzca la nueva contraseña:
          </label>
        </div>
        <div className="row mb-3">
          <label className="col-sm-5 col-form-label">Contraseña:</label>
          <div className="col-sm-7">
            <input
              type="password"
              className="form-control"
              name="password"
              maxLength="30"
              value={password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mb-5">
          <label className="col-sm-5 col-form-label">
            Confirmación contraseña:
          </label>
          <div className="col-sm-7">
            <input
              type="password"
              className="form-control"
              name="password2"
              maxLength="30"
              value={password2}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-6 col-form-label">
            <button
              className="btn btn-primary mr-5"
              type="button"
              onClick={irLogin}
            >
              Volver al login
            </button>
          </label>
          <div className="col-6 col-form-label text-right">
            <button type="submit" className="btn btn-success mr-5">
              Cambiar contraseña
            </button>
          </div>
        </div>
      </form>
    );
  } else {
    return (
      <div>
        <span className="mr-3">No autorizado</span>
        <button className="btn btn-primary" onClick={irLogin}>
          Ir login
        </button>
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
  startChangingPass,
})(ChangePass);
