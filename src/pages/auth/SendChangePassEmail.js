import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Typography, Divider } from 'antd';
import Swal from 'sweetalert2';
import { manejarError } from '../../helpers/errors';
import { fetchSinToken } from '../../helpers/services/fetch';
import { Loading } from '../../components/shared/Loading';
import './SendChangePassEmail.scss';

const { Title, Text } = Typography;

const layout = {
  labelCol: { span: 5, margin: 10 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 9, span: 4 },
};
const linksLayout = {
  wrapperCol: { offset: 4 },
};

const SendChangePassEmail = ({ history }) => {
  const [loading, setLoading] = useState(false);
  /**
   * Función que nvuelve al login
   */
  const volver = () => {
    history.push('/auth/login');
  };

  /**
   * Función que llama al servicio web para pedir un cambio de contraseña
   * @param {*} email
   */
  const ChangePassEmail = async (email) => {
    setLoading(true);
    const resp = await fetchSinToken(
      'auth/sendChangePassEmail',
      { email },
      'POST'
    );
    const body = await resp.json();
    setLoading(false);
    if (body.ok) {
      await Swal.fire({
        title: 'Instrucciones enviadas, revise su correo.',
        confirmButtonText: `Ir al login`,
        allowOutsideClick: false,
      });
      return true;
    } else {
      manejarError(body);
      return false;
    }
  };

  const onSubmit = async (e) => {
    const { email } = e;
    const resp = await ChangePassEmail(email);
    if (resp) {
      history.push('/auth/login');
    }
  };
  if (loading) return <Loading />;
  return (
    <div className="form-change-pass">
      <Title level={2} className="title-margin">
        ADRIWEB - CHANGE PASS
      </Title>
      <Text className="title-margin">
        {' '}
        Introduzca el email para cambiar la contraseña:
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
            Solicitar cambio de contraseña
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
})(SendChangePassEmail);
