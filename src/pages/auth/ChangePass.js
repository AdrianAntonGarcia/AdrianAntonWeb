import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { Form, Input, Button, Typography, Divider } from 'antd';
import {
  startCheckChangePass,
  checkChangePassTrue,
  startChangingPass,
} from '../../redux/actions/auth/authActions';
import { getAuth } from '../../redux/selectors/auth/authSelectors';
import './ChangePass.scss';
import { Loading } from '../../components/shared/Loading';

const { Title, Text } = Typography;

const layout = {
  labelCol: { span: 5, margin: 10 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: { offset: 10, span: 4 },
};

const linksLayout = {
  wrapperCol: { offset: 5 },
};

const ChangePass = ({
  history,
  checkChangePass,
  startCheckChangePass,
  checkChangePassTrue,
  startChangingPass,
  match: { params },
}) => {
  const [loading, setLoading] = useState(false);
  const { token } = params;
  useEffect(() => {
    if (checkChangePass === true) {
      startCheckChangePass(token);
    }
  }, [checkChangePass, startCheckChangePass, token]);

  const irLogin = () => {
    history.push('/auth/login');
    checkChangePassTrue();
  };

  const submitChange = async (e) => {
    const { password } = e;
    setLoading(true);
    startChangingPass(password, token).then((resultado) => {
      if (resultado === false) setLoading(false);
      if (resultado === true) {
        Swal.fire(
          'Contraseña cambiada',
          'Por favor, haga login con su nueva contraseña',
          'success'
        );
        history.push('/login');
      }
    });
  };
  if (loading) return <Loading />;
  if (checkChangePass) {
    return (
      <div className="form-register">
        <Title level={2} className="title-margin">
          ADRIWEB - CHANGE PASS
        </Title>
        <Text className="title-margin">
          Complete el formulario para cambiar su contraseña:
        </Text>
        <Divider></Divider>
        <Form {...layout} name="registerForm" onFinish={submitChange}>
          <Form.Item
            label="Nueva contraseña"
            name="password"
            rules={[
              {
                required: true,
                message: 'Por favor, introduce tu contraseña!',
              },
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
              Cambiar contraseña
            </Button>
          </Form.Item>
          <Form.Item {...linksLayout}>
            <Button type="link" htmlType="button" onClick={irLogin}>
              Ir login
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  } else {
    return (
      <div>
        <span className="mr-3">No autorizado</span>
        <button className="btn btn-primary" onClick={irLogin}>
          Ir login
        </button>
      </div>
    );
  }
};

/**
 * Devolvemos el estado del auth
 * @param {*} state
 */
const mapStateToProps = (state) => {
  const auth = getAuth(state);
  const { checkChangePass } = auth;
  return { checkChangePass };
};

/**
 * Si ha cambiado, no devolvemos para que deje de actualizarse
 * @param {*} next
 * @param {*} prev
 */
// const areStatesEqual = (next, prev) => {
//   console.log(next, prev);
//   return next.auth.checkChangePass !== prev.auth.checkChangePass;
// };
export default connect(mapStateToProps, {
  startCheckChangePass,
  checkChangePassTrue,
  startChangingPass,
})(ChangePass);
