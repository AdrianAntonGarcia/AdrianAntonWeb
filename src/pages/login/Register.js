import React from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm/useForm';
import { startRegister } from '../../redux/actions/auth/authActions';

import './register.scss';
const Register = ({ startRegister, history }) => {
  const [values, handleInputChange, reset] = useForm({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = values;

  const submitRegister = async (e) => {
    e.preventDefault();

    console.log(values);
    const resultado = await startRegister(name, email, password);
    console.log(resultado);
    reset();
    if (resultado) {
      await Swal.fire(
        'Usuario Registrado',
        'Por favor, revise el correo y active el usuario, después haga login',
        'success'
      );
      history.push('/login');
    }
  };
  return (
    <form className="form-register">
      <div className="row mb-5 ">
        <label className="col h1 text-center">AdriWeb - Register</label>
      </div>
      <hr />
      <br />
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

export default connect(null, { startRegister }, null, {
  pure: false,
})(Register);
