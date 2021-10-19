import React from 'react'
import GoogleLogin from "react-google-login";
import axios from "axios";

export const SignUp = () => {
  const responseSuccessGoogle = (response) => {
    axios({
      method: "POST",
      url: "http://localhost:5000/auth/googlesignup",
      data: { email: response.email, tokenId: response.tokenId },
    }).then((response) => {
      console.log("Google Registered Success! ", response);
    });
  };
  const responseErrorGoogle = (response) => {
    console.log(response);
  };
  return (
    <>
      <form>
        <h3>Register</h3>

        <div className="form-group">
            <label>First name</label>
            <input type="text" className="form-control" placeholder="First name" />
        </div>

        <div className="form-group">
            <label>Last name</label>
            <input type="text" className="form-control" placeholder="Last name" />
        </div>

        <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Enter email" />
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" />
        </div>

        <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
        <p className="forgot-password text-right">
            Already registered <a href="#">log in?</a>
        </p>
      </form>
      <div>
        <GoogleLogin
          clientId="493331810212-gpft07rmnm206mrr65hhm301drlpet63.apps.googleusercontent.com"
          buttonText="SignUp With Google "
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </>
  )
}
