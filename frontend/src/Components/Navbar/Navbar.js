import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { Dropdown } from "react-bootstrap";
export const Navbar = (props) => {
  const [name, setname] = useState("");
  const [user, setuser] = useState(localStorage.getItem("token"));
  let history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
    setname("");
    props.showAlert("Logout Successfully", "success");
  };

  useEffect(() => {
    const token = user;
    if (token) {
      const { exp, name } = decode(token);
      setname(name);
      if (Date.now() >= exp * 1000) {
        handleLogout();
      }
    }
    setuser(localStorage.getItem("token"));
  }, [location]);

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

          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link
                className="login-link mx-2"
                style={{ color: "#FFF" }}
                aria-current="page"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="signup-link mx-2"
                style={{ color: "#FFF" }}
                aria-current="page"
                to="/signup"
              >
                Signup
              </Link>
            </form>
          ) : (
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-2">Edit Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>
    </nav>
  );
};
