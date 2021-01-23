import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

export const LateralMenu = ({ state }) => {
  const [selectedKey, setselectedKey] = useState();

  useEffect(() => {
    if (state && state.sub === 'admin') {
      setselectedKey(state.option);
    }
    if (state && state.sub === 'public') {
      setselectedKey(state.option);
    }
  }, [state]);
  return (
    <Sider
      width={200}
      className="site-layout-background"
      collapsible="true"
      breakpoint="md"
    >
      <Menu
        mode="inline"
        style={{ height: '100%', borderRight: 0 }}
        selectedKeys={[selectedKey]}
        defaultOpenKeys={[state?.sub]}
      >
        <SubMenu key="public" icon={<UserOutlined />} title="Público">
          <Menu.Item icon={<UserOutlined />} key="1">
            <Link
              to={{
                pathname: '/home/inicio',
                state: { sub: 'public', option: '1' },
              }}
            >
              Inicio
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="admin" icon={<UserOutlined />} title="Administración">
          <Menu.Item icon={<UserOutlined />} key="2">
            <Link
              to={{
                pathname: '/home/users',
                state: { sub: 'admin', option: '2' },
              }}
            >
              Usuarios
            </Link>
          </Menu.Item>
          <Menu.Item icon={<UserOutlined />} key="3">
            <Link
              to={{
                pathname: '/home/prueba',
                state: { sub: 'admin', option: '3' },
              }}
            >
              Prueba
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};
