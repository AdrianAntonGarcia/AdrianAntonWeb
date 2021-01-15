import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm/useForm';
import { startRegister } from '../../redux/actions/auth/authActions';

import './register.scss';
const Register = ({ startRegister }) => {
  const [values, handleInputChange, reset] = useForm({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = values;
  const history = useHistory();
  /**
   * Función que navega a la pantalla de registro
   */
  const irLogin = () => {
    history.push('/auth/login');
  };

  /**
   * Submit del register
   * @param {*} e evento del submit
   */
  const submitRegister = (e) => {
    e.preventDefault();
    const resultado = startRegister(name, email, password);
    reset();
    if (resultado) {
      Swal.fire(
        'Usuario Registrado',
        'Por favor, revise el correo y active el usuario, después haga login',
        'success'
      );
      history.push('/login');
    } else {
      return;
    }
  };
  return (
    <form className="form-register" onSubmit={submitRegister}>
      <div className="row mb-5 ">
        <label className="col h1 text-center">AdriWeb - Register</label>
      </div>
      <hr />
      <br />
      <div className="row mb-3 ">
        <label className="col-12 col-form-label">
          Rellene el formulario para crear un usuario:
        </label>
      </div>
      <div className="row mb-3 ">
        <label className="col-sm-5 col-form-label">Nombre:</label>
        <div className="col-sm-7">
          <input
            type="text"
            className="form-control"
            maxLength="30"
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
            maxLength="60"
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
            maxLength="30"
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
            maxLength="30"
            value={password2}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-6 col-form-label">
          <button
            className="btn btn-primary mr-5"
            type="button"
            onClick={irLogin}
          >
            ¿Ya está registrado?
          </button>
        </label>
        <div className="col-6 col-form-label text-right">
          <button type="submit" className="btn btn-success mr-5">
            Registrarse
          </button>
        </div>
      </div>
    </form>
  );
};

export default connect(null, { startRegister }, null, {
  pure: false,
})(Register);
