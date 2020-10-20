import React from 'react';

import './login.css';
export const Login = (props) => {
  const submitLogin = (e) => {
    e.preventDefault();
    console.log('hola');
    console.log(props);
    props.history.push('/');
  };

  return (
    <div className="login-container ">
      <form onSubmit={submitLogin}>
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h3>LOGIN</h3>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-3">
            <h6>Email:</h6>
          </div>
          <div className="col-3">
            <div className="form-group">
              <input type="text" className="form-control"></input>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-3">
            <h6>Contraseña:</h6>
          </div>
          <div className="col-3 ">
            <div className="form-group">
              <input type="password" className="form-control"></input>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-5 text-center">
            <a href="/login" className="ForgetPwd ml-5">
              ¿Contraseña Olvidada?
            </a>
            <a href="/register" className="ForgetPwd ml-4">
              Registrarse
            </a>
          </div>
          <div className="col-5">
            <button type="submit" className="btn btn-primary ml-5">
              Login
            </button>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col text-left ml-5"></div>
        </div>
      </form>
    </div>
  );
};
