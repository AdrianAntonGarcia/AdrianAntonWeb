import React from 'react';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppRouter } from './routers/AppRouter';

import 'bootstrap/dist/css/bootstrap.min.css';
export const AdrianApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
