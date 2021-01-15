import React from 'react';
import Swal from 'sweetalert2';
import { fetchSinToken } from '../../helpers/services/fetch';
import { useForm } from '../../hooks/useForm/useForm';
import './resendValidation.scss';
import { manejarError } from '../../helpers/errors';
import { connect } from 'react-redux';
import {
  checkingTrue,
  checkingFalse,
} from '../../redux/actions/auth/authActions';

const ResendValidation = ({ checkingTrue, checkingFalse, history }) => {
  const [values, handleInputChange] = useForm({
    email: '',
  });
  const { email } = values;

  /**
   * Función que nvuelve al login
   */
  const volver = () => {
    history.push('/auth/login');
  };

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
      <div className="row mb-3">
        <label className="col-12 col-form-label">
          Introduzca el email al que reenviar el código de activación del
          usuario:
        </label>
      </div>
      <div className="row">
        <div className="col-4 col-form-label">
          <span>Correo del usuario:</span>
        </div>
        <div className="col-8">
          <input
            type="email"
            name="email"
            maxLength="60"
            value={email}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-6 col-form-label">
          <button className="btn btn-primary mr-5" onClick={volver}>
            Volver
          </button>
        </div>
        <div className="col-6 col-form-label">
          <button className="btn btn-success">Enviar validación</button>
        </div>
      </div>
    </form>
  );
};

export default connect(null, { checkingTrue, checkingFalse }, null, {
  pure: false,
})(ResendValidation);
