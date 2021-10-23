import React from "react";
import { Link } from "react-router-dom";
import {  useHistory } from "react-router-dom";
export const Navbar = (props) => {
  let history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
    props.showAlert("Logout Successfully", "success")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Kirayo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-success mx-2" type="submit">
            Search
          </button>

          {!localStorage.getItem('token') ? <form className="d-flex">
            <Link className="login-link mx-2" style={{ color: '#FFF' }} aria-current="page" to="/login">
              Login
            </Link>
            <Link className="signup-link mx-2" style={{ color: '#FFF' }} aria-current="page" to="/signup">
              Signup
            </Link>
          </form>: <button onClick={handleLogout} className="btn btn-primary">
            Logout
          </button>}
        </div>
      </div>
    </nav>
  );
};
