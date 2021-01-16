import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth/authActions';
import { Menu, Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import './Navbar.scss';

const { Header } = Layout;
const Navbar = ({ logout }) => {
  const logoutClick = (e) => {
    logout();
  };
  return (
    <Header theme="light">
      <Menu
        className="menu-right"
        theme="dark"
        mode="horizontal"
        // defaultSelectedKeys={['1']}
      >
        <Menu.Item className="color-red" key="1" onClick={logoutClick}>
          Logout <LogoutOutlined />
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default connect(null, { logout }, null, {
  pure: true,
})(Navbar);
