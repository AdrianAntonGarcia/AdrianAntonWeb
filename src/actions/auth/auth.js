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
    const resp = await fetchSinToken('auth/login', { email, password }, 'POST');
    
    const body = await resp.json();
    console.log(body)
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(
        login({
          uid: body.user._id,
          name: body.user.name,
        })
      );
    } else {
      Swal.fire('Error', body.msg, 'error');
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
