import React from 'react';
import Swal from 'sweetalert2';
import { manejarError } from '../../redux/actions/auth/auth';
import { fetchSinToken } from '../../helpers/services/fetch';
import { useForm } from '../../hooks/useForm/useForm';

import { useHistory } from 'react-router-dom';

import './resendValidation.scss';
import { useState } from 'react';
import { Loading } from '../../components/shared/Loading';

export const ResendValidation = () => {
  const [values, handleInputChange] = useForm({
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const { email } = values;
  const history = useHistory();
  const onSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      console.log(email);
      const resp = await fetchSinToken('auth/resendEmail', { email }, 'POST');
      const body = await resp.json();
      setLoading(false);
      /**
       * Si la respuesta es correcta notificamos al usuario de que revise el correo
       */

      if (body.ok) {
        Swal.fire({
          title: 'Validación enviada, revise su correo.',
          confirmButtonText: `Ir al login`,
          allowOutsideClick: false,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            history.push('/login');
          }
        });
      } else {
        manejarError(body);
      }
      console.log(body);
    } catch (error) {
      Swal.fire('Error interno', 'Hable con un administrador', 'error');
    }
  };
  if (!loading) {
    return (
      <form className="form-resendValidation" onSubmit={onSubmit}>
        <div className="row mb-5 ">
          <label className="col h1 text-center">AdriWeb - Validation</label>
        </div>
        <hr />
        <br />
        <div className="row">
          <div className="col-6 col-form-label">
            <span>Correo del usuario:</span>
          </div>
          <div className="col-6">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-6 col-form-label">
            <a className="p-3" href="/login">
              Volver
            </a>
          </div>
          <div className="col-6 col-form-label">
            <button className="btn btn-primary">Enviar validación</button>
          </div>
        </div>
      </form>
    );
  } else {
    return <Loading />;
  }
};
