import React from 'react';
import { useForm } from '../../hooks/useForm/useForm';

import './register.scss';
export const Register = (props) => {
  const [values, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = values;
  const submitRegister = (e) => {
    e.preventDefault();
    props.history.push('/login');
  };
  return (
    <form className="form-register">
      <div className="row mb-5 ">
        <label className="col h1 text-center">AdriWeb - Register</label>
      </div>
      <hr/>
      <br/>
      <div className="row mb-3 ">
        <label className="col-sm-5 col-form-label">Nombre:</label>
        <div className="col-sm-7">
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mb-3 ">
        <label className="col-sm-5 col-form-label">Correo:</label>
        <div className="col-sm-7">
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-5 col-form-label">Contraseña:</label>
        <div className="col-sm-7">
          <input
            type="password"
            className="form-control"
            name="password"
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
            value={password2}
            onChange={handleInputChange}
          />
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
