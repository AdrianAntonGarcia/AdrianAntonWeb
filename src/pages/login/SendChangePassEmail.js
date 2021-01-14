import React from 'react';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm/useForm';

export const SendChangePassEmail = ({ history }) => {
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
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`Submit: ${email}`);
    if (email.length < 1) {
      Swal.fire('Error', 'Email vacio, por favor introduzca uno', 'error');
    }
  };
  return (
    <form className="form-resendValidation" onSubmit={onSubmit}>
      <div className="row mb-5 ">
        <label className="col h1 text-center">AdriWeb - Change Pass</label>
      </div>
      <hr />
      <br />
      <div className="row mb-3">
        <label className="col-12 col-form-label">
          Introduzca el email al que mandar las instrucciones para restablecer
          la contraseña:
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
          <button className="btn btn-success" type="submit" onSubmit={onSubmit}>
            Solicitar cambio de contraseña
          </button>
        </div>
      </div>
    </form>
  );
};
