import React from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { startLogin } from '../../redux/actions/auth/authActions';
import './login.scss';

const layout = {
  labelCol: { span: 5, margin: 10 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 4 },
};
const linksLayout = {
  wrapperCol: { offset: 4 },
};

const Login = ({ startLogin, history }) => {
  /**
   * Función que navega a la pantalla de enviar email de validación
   */
  const irReenvioValidacion = () => {
    history.push('/auth/resendValidation');
  };
  /**
   * Función que navega a la pantalla de registro
   */
  const irRegister = () => {
    history.push('/auth/register');
  };
  /**
   * Función que navega a la pantalla de registro
   */
  const irSendChangePassEmail = () => {
    history.push('/auth/sendChangePassEmail');
  };
  /**
   * Submit del login
   * @param {*} e evento del submit
   */
  const submitLogin = (e) => {
    console.log(e);
    const { email, password } = e;
    startLogin(email, password);
  };

  const onFinishFailed = (e) => {
    console.log(e);
  };

  return (
    <div className="form-login">
      <Form
        {...layout}
        name="basic"
        onFinish={submitLogin}
        onFinishFailed={onFinishFailed}

        // style={{ margin: '10px' }}
      >
        <Form.Item
          label="Email"
          name="email"
          type="email"
          rules={[
            { required: true, message: 'Por favor, introduce tu email!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
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

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item {...linksLayout}>
          <Button type="link" htmlType="button" onClick={irRegister}>
            Registrarse
          </Button>
          <Button type="link" htmlType="button" onClick={irSendChangePassEmail}>
            ¿Contraseña olvidada?
          </Button>
          <Button type="link" htmlType="button" onClick={irReenvioValidacion}>
            Validar usuario
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(null, { startLogin }, null, {
  pure: true,
})(Login);
