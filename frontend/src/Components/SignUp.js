import React, {useState} from 'react'
import GoogleLogin from "react-google-login";
import axios from "axios";
import {  useHistory } from "react-router-dom";

export const SignUp = (props) => {
  const responseSuccessGoogle = (response) => {
    axios({
      method: "POST",
      url: "/auth/googlesignup",
      data: { email: response.email, tokenId: response.tokenId },
    }).then((response) => {
      props.showAlert("Account Registered successfully", "success");
    }).then(err =>{
      props.showAlert("This account is already registerted", "danger");
    })
  };
  const responseErrorGoogle = (response) => {
    console.log(response);
  };
  const history = useHistory();
  const [user,setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user,[name]: value})
  }

  const registerUser = async (e) => {
    e.preventDefault();

    const { name, email, password,confirmPassword } = user;
    axios({
      method: "POST",
      url: "/auth/register",
      data: {name,email,password,confirmPassword}
    }).then(response => {
      console.log("Registered Success! ", response);
      history.push('/');
      props.showAlert("Please verify your email address", "success")
    }).catch(err => {
      props.showAlert("Invalid Credentials", "danger")
    })
  } 
  return (
    <>
      <form className="regsiter-form my-2" method="POST" name="register-form" id="register-form" onSubmit={registerUser}>
        <h3>Register</h3>

        <div className="form-group my-2">
            <label>Name</label>
            <input name= "name" type="text" className="form-control my-1" value={ user.name }  onChange={handleInputs} placeholder="Your Name" />
        </div>

        <div className="form-group my-2">
            <label>Email</label>
            <input name="email" type="email" className="form-control my-1" value={ user.email} onChange={handleInputs} placeholder="Enter email" required/>
        </div>

        <div className="form-group my-2">
            <label>Password</label>
            <input name="password" type="password" className="form-control my-1" value={ user.password} onChange={handleInputs} placeholder="Enter password" required minLength={5}/>
        </div>

        <div className="form-group my-2">
            <label>Confirm Password</label>
            <input name="confirmPassword" type="Password" className="form-control my-1" value={ user.confirmPassword} onChange={handleInputs} placeholder="Enter confirm password" required minLength={5}/>
        </div>

        <button type="submit" className="btn btn-dark btn-lg btn-block my-2" >Register</button>
        <p className="forgot-password text-right">
            Already registered <a href="/login">log in?</a>
        </p>
        <div>
        <GoogleLogin
          clientId="493331810212-gpft07rmnm206mrr65hhm301drlpet63.apps.googleusercontent.com"
          buttonText="SignUp With Google "
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={"single_host_origin"}
         />
        </div>
      </form>
      
    </>
  )
}
