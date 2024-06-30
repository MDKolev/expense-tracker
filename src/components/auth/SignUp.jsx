import React from "react";
import "./signUp.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  return (
      <div className="register-container">
        <h1 className="title">Sign Up</h1>
        <form action="" className="form">
          <div className="username-wrapper">
            <FaUser className="icon" />
            <input type="text" placeholder="Username..." />
          </div>
          <div className="email-wrapper">
            <MdEmail className="icon" />
            <input type="email" placeholder="Email..." />
          </div>
          <div className="password-wrapper">
            <RiLockPasswordFill className="icon" />
            <input type="password" placeholder="Password..." />
          </div>
        </form>

        <button className="sign-up-button">Sign Up</button>
        <p>
          Or Sign Up With
          <FcGoogle className="google-icon" />{" "}
        </p>
      </div>
  );
};

export default SignUp;
