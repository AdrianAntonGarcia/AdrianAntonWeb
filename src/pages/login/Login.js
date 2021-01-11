import React from 'react';
import { useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm/useForm';
import { startLogin } from '../../redux/actions/auth/auth';

import './login.scss';
export const Login = () => {
  const [values, handleInputChange, reset] = useForm({
    email: '',
    password: '',
  });
  const { email, password } = values;
  const dispatch = useDispatch();

  const submitLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(email, password));
    reset();
  };

  return (
    <form className="form-login">
      <div className="row mb-5 ">
        <label className="col h1 text-center">AdriWeb - Login</label>
      </div>
      <hr />
      <br />
      <div className="row mb-3 ">
        <label className="col-sm-2 col-form-label">Correo:</label>
        <div className="col-sm-10">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-5">
        <label className="col-sm-2 col-form-label">Contraseña:</label>
        <div className="col-sm-10">
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-6 col-form-label">
          <a className="p-3" href="/register">
            Registro
          </a>
          <a className="p-3" href="/resendValidation">
            Reenviar validación
          </a>
        </label>
        <div className="col-6 col-form-label text-right">
          <button
            type="submit"
            onClick={submitLogin}
            className="btn btn-primary mr-5"
          >
            Loguearse
          </button>
        </div>
      </div>
    </form>
  );
};
