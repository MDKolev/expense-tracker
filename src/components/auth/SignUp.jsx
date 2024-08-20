import React, { useState } from "react";
import "./signUp.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase-config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";

const SignUp = ({ signInWithGoogle, signUpSuccess }) => {
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState("");

  const handleCredentials = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    console.log(userCredentials);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(
        auth,
        userCredentials.email,
        userCredentials.password
      );
      console.log(auth.currentUser);
      const user = auth.currentUser;
      localStorage.setItem("creationTime", user.metadata.creationTime);
      signUpSuccess();
      toast.success("Account created! You may log in!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <h1 className="title">Sign Up</h1>
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

        {error && <div className="error">{error}</div>}
      </form>

      <button
        className="sign-up-button"
        onClick={(e) => {
          handleSignUp(e);
        }}
      >
        Sign Up
      </button>
      <p onClick={signInWithGoogle}>
        Or Sign In With
        <FcGoogle className="google-icon" />{" "}
      </p>
    </div>
  );
};

export default SignUp;
