import React from 'react';

import './login.css';
export const Login = () => {
  return (
    <div className="login-container ">
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
        <div className="col-3">
          <a href="/login" class="ForgetPwd">¿Contraseña Olvidada?</a>
        </div>
        <div className="col-3">
          <button className="btn btn-primary ml-5">Login</button>
        </div>
      </div>
    </div>
  );
};
