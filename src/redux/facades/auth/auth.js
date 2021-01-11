import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { manejarError } from '../../../helpers/errors';
import { fetchSinToken } from '../../../helpers/services/fetch';
import { startLogin } from '../../actions/auth/auth';

/**
 * Functional component que va a centralizar la lógica de los selectores
 * y la llamada a los reducer de la parte del auth
 */
export const AuthFacade = () => {
  const dispatch = useDispatch();
  /**Estado del auth */
  const authState = useSelector((state) => state.auth);

  /**Función que realiza el login del usuario */
  const startLoginFacade = (email, password) => {
    dispatch(startLogin(email, password));
  };

  /**Función que realiza el login del usuario */
  const startRegisterFacade = async (name, email, password) => {
    return await startRegister(name, email, password);
  };

  /**
   * Función que llama al servicio para registrar un nuevo usuario
   * @param {*} name
   * @param {*} email
   * @param {*} password
   */
  const startRegister = async (name, email, password) => {
    try {
      const resp = await fetchSinToken(
        'auth/newUser',
        { name, email, password },
        'POST'
      );
      const body = await resp.json();
      /**
       * Si la respuesta es correcta registramos el token y hacemos el login
       */
      if (body.ok) {
        return true;
      } else {
        manejarError(body);
        return false;
      }
    } catch (error) {
      console.log('Error en registro usuario: ' + error);
      Swal.fire('Error interno', 'Hable con un administrador', 'error');
      return false;
    }
  };

  return { authState, startLoginFacade, startRegisterFacade };
};
