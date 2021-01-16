import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth/authActions';
import { Menu, Layout } from 'antd';
import './Navbar.scss';

const { Header } = Layout;
const Navbar = ({ logout }) => {
  const logoutClick = (e) => {
    logout();
  };
  return (
    <Header className="" theme="light">
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3" onClick={logoutClick}>
          Logout
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default connect(null, { logout }, null, {
  pure: true,
})(Navbar);
