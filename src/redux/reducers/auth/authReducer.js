import { types } from '../../types/types';

/**
 * Estado del auth
 */
const initialState = {
  checking: false,
  logged: false,
  user: null,
  name: '',
  checkChangePass: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return { ...state, ...action.payload, checking: false, logged: true };
    case types.authLogout:
      localStorage.removeItem('token');
      localStorage.removeItem('token-init-date');
      return initialState;
    case types.authLoggedFalse:
      return { ...state, logged: false };
    case types.authLoggedTrue:
      return { ...state, logged: true };
    case types.authCheckChangePassFalse:
      return { ...state, checkChangePass: false };
    case types.authCheckChangePassTrue:
      return { ...state, checkChangePass: true };
    default:
      return state;
  }
};
