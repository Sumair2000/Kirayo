import React, { useState } from "react";
import axios from "axios";
export const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async (e) => {
    axios({
      method: "POST",
      url: "/auth/recover",
      data: { email },
    })
      .then((res) => {
        props.showAlert(res.data.message, "success");
      })
      .catch((err) => {
        console.log(err);
        props.showAlert(
          "Please check your email or account doesn't exist",
          "danger"
        );
      });
  };

  return (
    <>
      <form className="reset-form my-3">
        <h3>Reset Password</h3>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={email}
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </form>
      <button
        type="submit"
        method="POST"
        className="btn btn-dark btn-lg btn-block my-2"
        onClick={handleResetPassword}
      >
        reset password
      </button>
    </>
  );
};
