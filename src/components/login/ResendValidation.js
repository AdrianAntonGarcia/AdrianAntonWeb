import React from 'react';

import './resendValidation.scss';

export const ResendValidation = () => {
  return (
    <form className="form-resendValidation">
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
          <input type="text" className="form-control" />
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
