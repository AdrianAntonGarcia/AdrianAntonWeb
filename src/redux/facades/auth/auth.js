import { useDispatch, useSelector } from 'react-redux';
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
  return { authState, startLoginFacade };
};
