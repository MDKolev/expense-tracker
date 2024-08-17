import React, { useState } from "react";
import "./authPage.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { auth, googleProvider } from "../../firebase-config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const navigate = useNavigate();

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

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home")
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container">
      <div className="sign-in-container">
        {showSignIn && <SignIn signInWithGoogle={handleSignInWithGoogle} />}
        {showRight && (
          <div className="right" onClick={handleSignInToggle}>
            <h1>No Account?</h1>
            <p>Register now and track all your expences for free</p>
          </div>
        )}
      </div>
      <div className="separator"></div>
      <div className="sign-up-container">
        {showSignUp && <SignUp signInWithGoogle={handleSignInWithGoogle} />}
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
