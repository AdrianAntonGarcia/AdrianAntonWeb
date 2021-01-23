import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

export const LateralMenu = ({ location: { state } }) => {
  const [selectedKey, setselectedKey] = useState('1');
  useEffect(() => {
    if (state) {
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
        selectedKeys={[selectedKey]}
        style={{ height: '100%', borderRight: 0 }}
        defaultOpenKeys={['admin']}
      >
        <SubMenu key="admin" icon={<UserOutlined />} title="Administración">
          <Menu.Item icon={<UserOutlined />} key="1">
            <Link
              to={{
                pathname: '/home/users',
                state: { sub: 'admin', option: '1' },
              }}
            >
              Usuarios
            </Link>
          </Menu.Item>
          <Menu.Item icon={<UserOutlined />} key="2">
            <Link
              to={{
                pathname: '/home/prueba',
                state: { sub: 'admin', option: '2' },
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
