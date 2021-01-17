import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import './loading.scss';
export const Loading = () => {
  return (
    <div className="loading">
      <div className="col-12 text-center">
        <span className="spanLoading">
          <LoadingOutlined />
        </span>
      </div>
    </div>
  );
};
