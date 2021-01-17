import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startRegister } from '../../redux/actions/auth/authActions';
import { Form, Input, Button, Typography, Divider } from 'antd';
import './register.scss';
import { Loading } from '../../components/shared/Loading';

const { Title, Text } = Typography;

const layout = {
  labelCol: { span: 5, margin: 10 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: { offset: 14, span: 4 },
};

const linksLayout = {
  wrapperCol: { span: 4 },
};
const Register = ({ startRegister }) => {
  const history = useHistory();
  /**
   * Función que navega a la pantalla de registro
   */
  const irLogin = () => {
    history.push('/auth/login');
  };

  const [loading, setLoading] = useState(false);

  /**
   * Submit del register
   * @param {*} e evento del submit
   */
  const submitRegister = async (e) => {
    const { name, email, password } = e;
    setLoading(true);
    const resultado = await startRegister(name, email, password);
    setLoading(false);
    console.log(resultado);
    if (resultado) {
      await Swal.fire(
        'Usuario Registrado',
        'Por favor, revise el correo y active el usuario, después haga login',
        'success'
      );
      history.push('/login');
    } else {
      return;
    }
  };
  if (loading) return <Loading />;
  return (
    <div className="form-register">
      <Title level={2} className="title-margin">
        ADRIWEB - REGISTER
      </Title>
      <Text className="title-margin">
        Complete el formulario para crear su usuario:
      </Text>
      <Divider></Divider>
      <Form {...layout} name="registerForm" onFinish={submitRegister}>
        <Form.Item
          label="Nombre"
          name="name"
          rules={[
            {
              required: true,
              message: 'Por favor, introduce un nombre!',
            },
            {
              required: true,
              min: 4,
              message: 'El nombre debe tener al menos 4 caracteres',
            },
          ]}
        >
          <Input />
        </Form.Item>
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
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            { required: true, message: 'Por favor, introduce tu contraseña!' },
            {
              required: true,
              min: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirmación contraseña"
          name="password2"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Por favor, confirma la contraseña!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Las contraseñas no coinciden');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} className="button-register">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item {...linksLayout}>
          <Button type="link" htmlType="button" onClick={irLogin}>
            ¿Ya está registrado?
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(null, { startRegister }, null, {
  pure: true,
})(Register);
