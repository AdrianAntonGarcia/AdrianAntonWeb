import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/shared/Navbar';
import { LateralMenu } from '../../components/shared/LateralMenu';
import { getAuth } from '../../redux/selectors/auth/authSelectors';
import { Layout } from 'antd';

import './home.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AdminUsers } from './admin/AdminUsers';
import { Prueba } from './admin/Prueba';

const { Footer, Content } = Layout;

const Home = (props) => {
  return (
    <Layout className="layout">
      <Navbar />
      <Layout>
        <LateralMenu {...props} />
        <Layout>
          <Content style={{ padding: '50px 50px' }}>
            <Switch>
              <Route exact path="/home/users" component={AdminUsers} />
              <Route exact path="/home/prueba" component={Prueba} />
              <Redirect to="/home/users" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Adrián Antón Web - 2021
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  const auth = getAuth(state);
  return { auth };
};

export default connect(mapStateToProps, null, null, {
  pure: true,
})(Home);
