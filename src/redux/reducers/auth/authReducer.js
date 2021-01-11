import { types } from '../../types/types';

/**
 * Estado del auth
 */
const initialState = {
  checking: true,
  idUser: null,
  name: '',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return { ...state, ...action.payload, checking: false };
    case types.authLogout:
      return { checking: true };
    default:
      return state;
  }
};
