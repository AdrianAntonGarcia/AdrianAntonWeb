import { types } from '../../types/types';

/**
 * Acción síncrona que guarda el estado del usuario
 * @param {*} user
 */
export const getUsers = (users) => ({
  type: types.usersGetUsers,
  payload: users,
});
