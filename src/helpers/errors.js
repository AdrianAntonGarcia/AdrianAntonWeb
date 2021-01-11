import Swal from 'sweetalert2';

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
