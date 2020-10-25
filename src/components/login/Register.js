import React from 'react';

import './register.scss';
export const Register = (props) => {
  console.log(props);
  const submitRegister = (e) => {
    e.preventDefault();
    props.history.push('/');
  };
  return (
    <form className="form-register ">
      <div className="row mb-5 ">
        <label className="col h1 text-center">AdriWeb - Registro</label>
      </div>
      <div className="row mb-3 ">
        <label className="col-sm-5 col-form-label">Nombre:</label>
        <div className="col-sm-7">
          <input type="text" className="form-control" name="name" />
        </div>
      </div>
      <div className="row mb-3 ">
        <label className="col-sm-5 col-form-label">Correo:</label>
        <div className="col-sm-7">
          <input type="email" className="form-control" name="email" />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-5 col-form-label">Contraseña:</label>
        <div className="col-sm-7">
          <input type="password" className="form-control" name="password" />
        </div>
      </div>
      <div className="row mb-5">
        <label className="col-sm-5 col-form-label">
          Confirmación contraseña:
        </label>
        <div className="col-sm-7">
          <input type="password" className="form-control" name="passwor2" />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-6 col-form-label">
          <a className="p-3" href="/login">
            ¿Ya está registrado?
          </a>
        </label>
        <div className="col-6 col-form-label text-right">
          <button
            type="submit"
            onClick={submitRegister}
            className="btn btn-primary mr-5"
          >
            Registrarse
          </button>
        </div>
      </div>
    </form>
  );
};
