import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Form, Input, Button, Typography, Divider } from 'antd';
import { fetchSinToken } from '../../helpers/services/fetch';
import { manejarError } from '../../helpers/errors';
import { connect } from 'react-redux';
import { Loading } from '../../components/shared/Loading';
import './resendValidation.scss';

const { Title, Text } = Typography;

const layout = {
  labelCol: { span: 5, margin: 10 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 9, span: 4 },
};
const linksLayout = {
  wrapperCol: { offset: 4 },
};

const ResendValidation = ({ history }) => {
  const [loading, setLoading] = useState(false);
  /**
   * Función que nvuelve al login
   */
  const volver = () => {
    history.push('/auth/login');
  };

  const onSubmit = async (e) => {
    try {
      const { email } = e;
      setLoading(true);
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
    } catch (error) {
      Swal.fire('Error interno', 'Hable con un administrador', 'error');
    }
  };
  if (loading) return <Loading />;
  return (
    <div className="form-change-pass">
      <Title level={2} className="title-margin">
        ADRIWEB - VALIDATION
      </Title>
      <Text className="title-margin">
        Introduzca el email al que reenviar el código de activación del usuario:
      </Text>
      <Divider></Divider>
      <Form {...layout} name="basic" onFinish={onSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Por favor, introduce un email correcto!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout} className="button-change">
          <Button type="primary" htmlType="submit">
            Enviar validación
          </Button>
        </Form.Item>
        <Form.Item {...linksLayout} className="button-back">
          <Button type="link" htmlType="button" onClick={volver}>
            Volver
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(null, null, null, {
  pure: true,
})(ResendValidation);
