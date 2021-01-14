import React from 'react';
import Swal from 'sweetalert2';
import { fetchSinToken } from '../../helpers/services/fetch';
import { useForm } from '../../hooks/useForm/useForm';
import { useHistory } from 'react-router-dom';
import './resendValidation.scss';
import { manejarError } from '../../helpers/errors';
import { connect } from 'react-redux';
import {
  checkingTrue,
  checkingFalse,
} from '../../redux/actions/auth/authActions';

const ResendValidation = ({ checkingTrue, checkingFalse }) => {
  const [values, handleInputChange] = useForm({
    email: '',
  });
  const { email } = values;
  const history = useHistory();
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      checkingTrue();
      const resp = await fetchSinToken('auth/resendEmail', { email }, 'POST');
      const body = await resp.json();
      checkingFalse();
      /**
       * Si la respuesta es correcta notificamos al usuario de que revise el correo
       */

      if (body.ok) {
        Swal.fire({
          title: 'Validación enviada, revise su correo.',
          confirmButtonText: `Ir al login`,
          allowOutsideClick: false,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            history.push('/login');
          }
        });
      } else {
        manejarError(body);
      }
      console.log(body);
    } catch (error) {
      Swal.fire('Error interno', 'Hable con un administrador', 'error');
    }
  };

  return (
    <form className="form-resendValidation" onSubmit={onSubmit}>
      <div className="row mb-5 ">
        <label className="col h1 text-center">AdriWeb - Validation</label>
      </div>
      <hr />
      <br />
      <div className="row">
        <div className="col-6 col-form-label">
          <span>Correo del usuario:</span>
        </div>
        <div className="col-6">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-6 col-form-label">
          <a className="p-3" href="/login">
            Volver
          </a>
        </div>
        <div className="col-6 col-form-label">
          <button className="btn btn-primary">Enviar validación</button>
        </div>
      </div>
    </form>
  );
};

export default connect(null, { checkingTrue, checkingFalse }, null, {
  pure: false,
})(ResendValidation);
