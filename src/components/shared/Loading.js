import React from 'react';

import './loading.scss';
export const Loading = () => {
  return (
    <div className="loading">
      <div className="col-12 text-center">
        <span className="spanLoading text-primary">Loading...</span>
      </div>
    </div>
  );
};
