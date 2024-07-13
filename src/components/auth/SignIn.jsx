import React, { useEffect, useState } from "react";
import "./signIn.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase-config/firebase";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = ({signInWithGoogle}) => {
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCredentials = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    console.log(userCredentials);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(
        auth,
        userCredentials.email,
        userCredentials.password
      );
      localStorage.setItem('userEmail', userCredentials.email)
      navigate("/home")
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordReset = () => {
    const email = prompt("Please enter your email");
    sendPasswordResetEmail(auth, email);
    alert('Email sent! Check your inbox for password reset instructions.')
  }

  return (
    <div className="login-container">
      <h1 className="title">Sign In</h1>
      <form action="" className="form">
        <div className="email-wrapper">
          <MdEmail className="icon" />
          <input
            type="email"
            placeholder="Email..."
            name="email"
            onChange={(e) => {
              handleCredentials(e);
            }}
          />
        </div>
        <div className="password-wrapper">
          <RiLockPasswordFill className="icon" />
          <input
            type="password"
            placeholder="Password..."
            name="password"
            onChange={(e) => {
              handleCredentials(e);
            }}
          />
        </div>
        <p className="forgot-password" onClick={handlePasswordReset}>Forgot password?</p>
        {error && <div className="error">{error}</div>}
      </form>
      <button className="sign-in-button" onClick={(e) => handleSignIn(e)}>
        Sign In
      </button>
      <p>
        Or Sign In With
        <FcGoogle className="google-icon" onClick={signInWithGoogle}/>{" "}
      </p>
    </div>
  );
};

export default SignIn;
