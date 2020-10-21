import React from 'react';

import './register.css';
export const Register = (props) => {
  console.log(props);
  const submitRegister = (e) => {
    e.preventDefault();
    props.history.push('/');
  };
  return (
    <div className="register-container">
      <form onSubmit={submitRegister}>
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h3>REGISTER</h3>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-4">
            <h6>Email:</h6>
          </div>
          <div className="col-6">
            <div className="form-group">
              <input type="email" className="form-control"></input>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-4">
            <h6>Nombre:</h6>
          </div>
          <div className="col-6">
            <div className="form-group">
              <input type="text" className="form-control"></input>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-4">
            <h6>Contraseña:</h6>
          </div>
          <div className="col-6 ">
            <div className="form-group">
              <input type="password" className="form-control"></input>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-4">
            <h6>Repita la contraseña:</h6>
          </div>
          <div className="col-6 ">
            <div className="form-group">
              <input type="password" className="form-control"></input>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-6 text-center">
            <a href="/login" className="ForgetPwd ml-4">
              Ir al Login
            </a>
          </div>
          <div className="col-4">
            <button type="submit" className="btn btn-primary ml-5">
              Registrarse
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
