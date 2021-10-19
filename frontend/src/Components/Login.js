import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";

export const Login = () => {
  const responseSuccessGoogle = (response) => {
    axios({
      method: "POST",
      url: "http://localhost:5000/auth/googlelogin",
      data: { email: response.email, tokenId: response.tokenId },
    }).then((response) => {
      console.log("Google Login Success! ", response);
    });
  };
  const responseErrorGoogle = (response) => {
    console.log(response);
  };
  return (
    <>
      <div>
      <form>

<h3>Log in</h3>

<div className="form-group">
    <label>Email</label>
    <input type="email" className="form-control" placeholder="Enter email" />
</div>

<div className="form-group">
    <label>Password</label>
    <input type="password" className="form-control" placeholder="Enter password" />
</div>

<div className="form-group">
    <div className="custom-control custom-checkbox">
        <input type="checkbox" className="custom-control-input" id="customCheck1" />
        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
    </div>
</div>

<button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
<p className="forgot-password text-right">
     <a href="#">Forgot password?</a>
</p>
</form>
      </div>
      <div>
        <GoogleLogin
          clientId="493331810212-gpft07rmnm206mrr65hhm301drlpet63.apps.googleusercontent.com"
          buttonText="Login With Google "
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </>
  );
};
