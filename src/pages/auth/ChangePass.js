import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSinTokenParams } from '../../helpers/services/fetch';

const ChangePass = ({ match: { params } }) => {
  const { token } = params;
  useEffect(() => {
    comprobarToken(token);
  }, [token]);

  const comprobarToken = async (token) => {
    const resp = await fetchSinTokenParams(
      'auth/validateToken',
      {},
      { queryParams: { token } },
      'POST'
    );
    console.log(resp);
  };
  return (
    <div>
      <span>ChangePass page</span>
    </div>
  );
};

export default connect(null, null, null, {
  pure: false,
})(ChangePass);
