import React from 'react';
import { useForm } from '../../hooks/useForm/useForm';
import { startLogin } from '../../redux/actions/auth/authActions';
import { connect } from 'react-redux';
import './login.scss';

const Login = ({ startLogin, history }) => {
  const [values, handleInputChange, reset] = useForm({
    email: '',
    password: '',
  });
  const { email, password } = values;
  /**
   * Función que navega a la pantalla de enviar email de validación
   */
  const irReenvioValidacion = () => {
    history.push('/auth/resendValidation');
  };
  /**
   * Función que navega a la pantalla de registro
   */
  const irRegister = () => {
    history.push('/auth/register');
  };
  /**
   * Función que navega a la pantalla de registro
   */
  const irSendChangePassEmail = () => {
    history.push('/auth/sendChangePassEmail');
  };
  /**
   * Submit del login
   * @param {*} e evento del submit
   */
  const submitLogin = (e) => {
    e.preventDefault();
    startLogin(email, password);
    reset();
  };

  return (
    <form className="form-login" onSubmit={submitLogin}>
      <div className="row mb-5 ">
        <label className="col h1 text-center">AdriWeb - Login</label>
      </div>
      <hr />
      <br />
      <div className="row mb-3 ">
        <label className="col-12 col-form-label">
          Introduzca su correo y contraseña:
        </label>
      </div>
      <div className="row mb-3 ">
        <label className="col-sm-2 col-form-label">Correo:</label>
        <div className="col-sm-10">
          <input
            type="email"
            name="email"
            maxLength="60"
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
            maxLength="30"
            minLength="6"
            value={password}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-6 col-form-label">
          <button
            className="btn btn-primary mr-2 p-1"
            type="button"
            onClick={irRegister}
          >
            Registro
          </button>
          <button
            className="btn btn-primary  p-1"
            onClick={irReenvioValidacion}
            type="button"
          >
            Reenviar validación
          </button>
        </label>
        <div className="col-6 col-form-label text-right">
          <button type="submit" className="btn btn-success mr-5">
            Login
          </button>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-7 col-form-label text-left">
          <button
            className="btn btn-secondary mr-2 p-1"
            type="button"
            onClick={irSendChangePassEmail}
          >
            ¿Contraseña olvidada?
          </button>
        </label>
      </div>
    </form>
  );
};

export default connect(null, { startLogin }, null, {
  pure: true,
})(Login);
