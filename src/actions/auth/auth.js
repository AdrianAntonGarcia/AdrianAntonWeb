import Swal from 'sweetalert2';
import { fetchSinToken } from '../../helpers/services/fetch';
import { types } from '../../types/types';

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
            idUser: body.user._id,
            name: body.user.name,
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
 * Acción síncrona que guarda el estado del usuario
 * @param {*} user
 */
const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

/**
 * Acción síncrona que reseta el estado de la aplicación,
 * una vez hecho esto, el router saca al usuario de la app
 */
export const logout = () => ({
  type: types.authLogout,
});

/**
 * Función que saca los errores al usuario del login a partir
 * de los mensajes que llegan de la base de datos
 * @param {*} body
 */
export const manejarError = (body) => {
  if (typeof body.errorMsg === 'string') {
    Swal.fire('Error', body.errorMsg, 'error');
  } else {
    body.errorMsg.password?.msg && body.errorMsg.email?.msg
      ? Swal.fire(
          'Error en el login',
          `${body.errorMsg.password?.msg} ${body.errorMsg.email?.msg}`,
          'error'
        )
      : body.errorMsg.password?.msg
      ? Swal.fire(
          'Error en el login',
          `${body.errorMsg.password?.msg}`,
          'error'
        )
      : Swal.fire('Error en el login', `${body.errorMsg.email?.msg}`, 'error');
  }
};
