import React, { useState } from "react";
import "./authPage.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthPage = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleSignInToggle = () => {
    setShowSignIn((prevShowSignIn) => !prevShowSignIn);
    setShowSignUp((prevShowSignUp) => !prevShowSignUp);
    setShowLeft((prevSetShowLeft) => !prevSetShowLeft);
    setShowRight((prevSetShowRight) => !prevSetShowRight);
  };

  const handleSignUpToggle = () => {
    setShowSignUp((prevShowSignUp) => !prevShowSignUp);
    setShowSignIn((prevShowSignIn) => !prevShowSignIn);
    setShowLeft((prevSetShowLeft) => !prevSetShowLeft);
    setShowRight((prevSetShowRight) => !prevSetShowRight);
  };

  return (
    <div className="container">
      <div className="sign-in-container">
        {showSignIn && <SignIn />}
        {showRight && (
          <div className="right" onClick={handleSignInToggle}>
            <h1>No Account?</h1>
            <p>Register now and track all your expences for free</p>
          </div>
        )}
      </div>
      <div className="sign-up-container">
        {showSignUp && <SignUp />}
        {showLeft && (
          <div className="left" onClick={handleSignUpToggle}>
            <h1>Already registered?</h1>
            <p>Login now and to access your expenses</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
