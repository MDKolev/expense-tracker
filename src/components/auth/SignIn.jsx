import React, { useState } from "react";
import "./signIn.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase-config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async() => {
    try{
      await createUserWithEmailAndPassword(auth, email, password)
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">Sign In</h1>
      <form action="" className="form">
        <div className="email-wrapper">
          <MdEmail className="icon" />
          <input
            type="email"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password-wrapper">
          <RiLockPasswordFill className="icon" />
          <input
            type="password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="forgot-password">Forgot password?</p>
        <div></div>
      </form>
      <button className="sign-in-button" onClick={signIn}>
        Sign In
      </button>
      <p>
        Or Sign In With
        <FcGoogle className="google-icon" />{" "}
      </p>
    </div>
  );
};

export default SignIn;
