import Swal from 'sweetalert2';
import { manejarError } from '../../../helpers/errors';
import {
  fetchConToken,
  fetchSinToken,
  fetchSinTokenParams,
} from '../../../helpers/services/fetch';
import { types } from '../../types/types';

/**
 * Función que comprueba que el usuario ya tuviera un token válido,
 * para no tener que hacer checking de nuevo, le renovamos le token
 */
export const comprobarLogin = () => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem('token');
      // Si el token no existe
      if (!token) {
        dispatch(checkingFalse());
        dispatch(loggedFalse());
        return false;
      }
      const resp = await fetchConToken('auth/renew');
      const body = await resp.json();
      token = body.token;
      // Asignamos el nuevo token
      localStorage.setItem('token', token);
      console.log(body);

      dispatch(
        login({
          user: body.usuario,
        })
      );
    } catch (error) {
      console.log('Error en comprobación del login del usuario ' + error);
    }
  };
};

/**
 * Acción asíncrona que realiza el login del usuario, llamando a la base de datos y
 * llamando a la acción para guardar el estado del usuario
 * @param {*} email
 * @param {*} password
 */
export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken(
        'auth/login',
        { email, password },
        'POST'
      );

      const body = await resp.json();

      /**
       * Si la respuesta es correcta registramos el token y hacemos el login
       */
      if (body.ok && body.user._id != null) {
        localStorage.setItem('token', body.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(
          login({
            user: body.user,
          })
        );
      } else {
        manejarError(body);
      }
    } catch (error) {
      Swal.fire('Error interno', 'Hable con un administrador', 'error');
    }
  };
};

/**
 * Función que llama al servicio para registrar un nuevo usuario
 * @param {*} name
 * @param {*} email
 * @param {*} password
 */
export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch(checkingTrue());
      const resp = await fetchSinToken(
        'auth/newUser',
        { name, email, password },
        'POST'
      );
      const body = await resp.json();
      if (body.ok) {
        dispatch(checkingFalse());
        return true;
      } else {
        dispatch(checkingFalse());
        manejarError(body);
        return false;
      }
    } catch (error) {
      console.log('Error en registro usuario: ' + error);
      Swal.fire('Error interno', 'Hable con un administrador', 'error');
      return false;
    }
  };
};

/**
 * Acción que comprueba que el token sea válido y da acceso
 * a la pantalla de cambio de contraseña
 * @param {*} token
 */
export const startCheckChangePass = (token) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinTokenParams(
        'auth/validateToken',
        {},
        { queryParams: { token } },
        'POST'
      );
      const body = await resp.json();
      if (body.ok) {
        dispatch(checkChangePassTrue());
        return body.uid;
      } else {
        dispatch(checkChangePassFalse());
        return false;
      }
    } catch (error) {
      console.log('Error en checkChangePass: ' + error);
      Swal.fire('Error interno', 'Hable con un administrador', 'error');
      return false;
    }
  };
};

export const startChangingPass = (password, token) => {
  return async (dispatch) => {
    try {
      dispatch(checkingTrue);
      const resp = await fetchSinToken(
        'auth/changePass/' + token,
        { password },
        'POST'
      );
      const body = await resp.json();
      dispatch(checkingFalse);
      if (body.ok) {
        return true;
      } else {
        Swal.fire('Contraseña no cambiada', body.errorMsg, 'error');
        return false;
      }
    } catch (error) {
      console.log('Error en startChangingPass: ' + error);
      Swal.fire('Error interno', 'Hable con un administrador', 'error');
      return false;
    }
  };
};

/**
 * Acción síncrona que guarda el estado del usuario
 * @param {*} user
 */
export const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

/**
 * Acción síncrona que pone el checkChangePass a true,
 * para decir que se puede entrar a la página de cambio de pass
 */
export const checkChangePassTrue = () => ({
  type: types.authCheckChangePassTrue,
});

/**
 * Acción síncrona que pone el checkChangePass a false,
 * para decir que se no puede entrar a la página de cambio de pass
 */
export const checkChangePassFalse = () => ({
  type: types.authCheckChangePassFalse,
});

/**
 * Acción síncrona que pone el checking a true,
 * para decir que la aplicación está cargando
 */
export const checkingTrue = () => ({
  type: types.authCheckingTrue,
});

/**
 * Acción síncrona que pone el checking a false,
 * para decir que la aplicación ya ha terminado de cargar
 */
export const checkingFalse = () => ({
  type: types.authCheckingFalse,
});

/**
 * Acción síncrona que pone el logged a true,
 * para decir que el usuario está logueado
 */
export const loggedTrue = () => ({
  type: types.authLoggedTrue,
});

/**
 * Acción síncrona que pone el checking a false,
 * para decir que la aplicación ya ha terminado de cargar
 */
export const loggedFalse = () => ({
  type: types.authLoggedFalse,
});

/**
 * Acción síncrona que reseta el estado de la aplicación,
 * una vez hecho esto, el router saca al usuario de la app
 */
export const logout = () => ({
  type: types.authLogout,
});
