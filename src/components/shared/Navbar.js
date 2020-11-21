import React from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '../../actions/auth/auth';

const logoutAction = logout;
export const Navbar = ({props}) => {
  const dispatch = useDispatch();
  console.log(props)
  const logout = (e) =>{
    e.preventDefault();
    dispatch(logoutAction())
    props.history.push('/login');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Navbar
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Pricing
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="/">
              Disabled
            </a>
          </li>
        </ul>
        <form onSubmit={logout} className="form-inline my-2 my-lg-0">
          <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">
            Logout
          </button>
        </form>
      </div>
    </nav>
  );
};
