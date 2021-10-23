import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import {  Link,useHistory } from "react-router-dom";

export const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  
  const responseSuccessGoogle = (response) => {
    axios({
      method: "POST",
      url: "/auth/googlelogin",
      data: { email: response.email, tokenId: response.tokenId },
    }).then((res) => {
      localStorage.setItem("token",res.data.token);
      history.push("/");
      props.showAlert("Account Login Successfully", "success")
    }).catch(err => {
      props.showAlert("Please register your gmail account", "danger")
    })
  };
  const responseErrorGoogle = (response) => {
    console.log(response);
  };
  const history = useHistory();
  
  const loginUser = async (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "/auth/login",
      data: {email,password}
    }).then(res => {
      localStorage.setItem("token",res.data.token);
      history.push("/");
      props.showAlert("Account Login Successfully", "success")
    }).catch(err => {
      props.showAlert("Inavlid credentials" , "danger")
    })
  }

  return (
    <>
      <div>
        <form className="login-form my-2" method="POST" name="login-form" id="login-form">
          <h3>Log in</h3>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={email}
              placeholder="Enter email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="form-group my-2">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              placeholder="Enter password"
              required minLength={6}
              autoComplete="true"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark btn-lg btn-block my-2"
            onClick={loginUser}
          >
            Log In
          </button>
          <p>
            <Link to="/login" onClick={()=> window.open("/forgotPassword", "_blank")}>Forgot password?</Link>
          </p>
          <div>
        <GoogleLogin
          clientId="493331810212-gpft07rmnm206mrr65hhm301drlpet63.apps.googleusercontent.com"
          buttonText="Login With Google "
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
        </form>
      </div>
      
    </>
  );
};
