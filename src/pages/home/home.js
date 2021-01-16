import React, { useState } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/shared/Navbar';
import { getAuth } from '../../redux/selectors/auth/authSelectors';
import { checkingTrue } from '../../redux/actions/auth/authActions';
import { message, Layout, Breadcrumb } from 'antd';
import './home.scss';
const { Footer, Content } = Layout;

const Home = ({ history }) => {
  const [date, setDate] = useState(null);
  const handleChange = (value) => {
    message.info(
      `Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`
    );
    setDate(value);
  };
  return (
    <Layout className="layout">
      <Navbar />
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">Content</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  const auth = getAuth(state);
  return { auth };
};

export default connect(mapStateToProps, { checkingTrue }, null, {
  pure: true,
})(Home);
