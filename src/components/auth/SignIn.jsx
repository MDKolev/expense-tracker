import React from "react";
import "./signIn.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  return (
          <div className="login-container">
        <h1 className="title">Sign In</h1>
        <form action="" className="form">
          <div className="email-wrapper">
            <MdEmail className="icon" />
            <input type="email" placeholder="Email..." />
          </div>
          <div className="password-wrapper">
            <RiLockPasswordFill className="icon" />
            <input type="password" placeholder="Password..." />
          </div>
          <p className="forgot-password">Forgot password?</p>
          <div></div>
        </form>
        <button className="sign-in-button">Sign In</button>
        <p>
          Or Sign In With
          <FcGoogle className="google-icon" />{" "}
        </p>
      </div>
  );
};

export default SignIn;
