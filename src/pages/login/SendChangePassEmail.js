import React from 'react';
import { useForm } from '../../hooks/useForm/useForm';

export const SendChangePassEmail = () => {
  const [values, handleInputChange] = useForm({
    email: '',
  });
  const { email } = values;
  const onSubmit = () => {
    console.log(`Submit: ${email}`);
  };
  return (
    <form className="form-resendValidation" onSubmit={onSubmit}>
      <div className="row mb-5 ">
        <label className="col h1 text-center">AdriWeb - Change Pass</label>
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
          <button className="btn btn-primary">
            Solicitar cambio de contraseña
          </button>
        </div>
      </div>
    </form>
  );
};
