import React, { useState } from "react";
import "./home.css";
import profilePic from "../../assets/profile-pic.jpeg";
import { GiMoneyStack } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import Expenses from "../features/Expenses";
import Settings from "../features/Settings";
import { IoLogOutOutline } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config/firebase";
import { useNavigate } from "react-router-dom";


const Home = ({ emailOfUser }) => {
  const [isActive, setIsActive] = useState(true);
  const [isExpensesActive, setIsExpensesActive] = useState(true);
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsExpensesActive((prevExpensesActive) => !prevExpensesActive);
    setIsSettingsActive((prevSettingsActive) => !prevSettingsActive);
  };

  const handleClick = () => {
    console.log(emailOfUser);
  };

  const handleLogout = async() => {
    try {
      await signOut(auth);
      navigate("/")
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div className="home-container">
      <div className="sidebar">
        <div>
          <img src={profilePic} alt="" className="profile-pic" />
          <span>Example Username</span>

          <button className="feature-btn" onClick={handleToggle}>
            <GiMoneyStack className="feature-icon" /> Expenses
          </button>
          <button className="feature-btn" onClick={handleToggle}>
            <FiSettings className="feature-icon" /> Settings
          </button>
        </div>

        <button className="logout-btn" onClick={handleLogout} >
          <IoLogOutOutline className="logout-icon" /> Logout
        </button>
      </div>

      <div className="feature-window">
        {isExpensesActive && <Expenses />}
        {isSettingsActive && <Settings />}
      </div>
    </div>
  );
};

export default Home;
