import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { manejarError } from '../../../helpers/errors';
import { fetchConToken, fetchSinToken } from '../../../helpers/services/fetch';
import {
  startLogin,
  login,
  checkingTrue,
  checkingFalse,
  loggedFalse,
  loggedTrue,
  logout as logoutAction,
} from '../../actions/auth/authActions';

/**
 * Functional component que va a centralizar la lógica de los selectores
 * y la llamada a los reducer de la parte del auth
 */
export const AuthFacade = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dispatch = useCallback(useDispatch(), []);

  /**Función que realiza el login del usuario */
  const startLoginFacade = (email, password) => {
    dispatch(startLogin(email, password));
  };

  /**
   * Ponemos el checking en true para mostrar el cargando
   */
  const setCheckingTrue = () => {
    dispatch(checkingTrue());
  };

  /**
   * Ponemos el checking en false para quitar el cargando
   */
  const setCheckingFalse = useCallback(() => {
    dispatch(checkingFalse());
  }, [dispatch]);

  /**
   * Ponemos el logged en true para indicar que el usuario esta logueado
   */
  const setLoggedTrue = () => {
    dispatch(loggedTrue());
  };

  /**
   * Ponemos el logged en false para indicar que el usuario no esta logueado
   */
  const setLoggedFalse = useCallback(() => {
    dispatch(loggedFalse());
  }, [dispatch]);

  /**
   * Función que limpia el store y el localStorage para salir de la app
   */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token-init-date');
    dispatch(logoutAction());
  };
  /**
   * Función que realiza el login del usuario
   * @param {*} name
   * @param {*} email
   * @param {*} password
   */
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
      setCheckingTrue();
      const resp = await fetchSinToken(
        'auth/newUser',
        { name, email, password },
        'POST'
      );
      const body = await resp.json();
      if (body.ok) {
        setCheckingFalse();
        return true;
      } else {
        setCheckingFalse();
        manejarError(body);
        return false;
      }
    } catch (error) {
      console.log('Error en registro usuario: ' + error);
      Swal.fire('Error interno', 'Hable con un administrador', 'error');
      return false;
    }
  };

  /**
   * Función que comprueba que el usuario ya tuviera un token válido,
   * para no tener que hacer checking de nuevo, le renovamos le token
   */
  const comprobarLogin = useCallback(async () => {
    try {
      let token = localStorage.getItem('token');
      // Si el token no existe
      if (!token) {
        setCheckingFalse();
        setLoggedFalse();
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
      return body;
    } catch (error) {
      console.log('Error en comprobación del login del usuario ' + error);
      return false;
    }
  }, [dispatch, setCheckingFalse, setLoggedFalse]);

  return {
    startLoginFacade,
    startRegisterFacade,
    comprobarLogin,
    setCheckingTrue,
    setCheckingFalse,
    setLoggedTrue,
    setLoggedFalse,
    logout,
  };
};
