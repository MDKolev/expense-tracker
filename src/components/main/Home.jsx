import React, { useState } from "react";
import "./home.css";
import profilePic from "../../assets/profile-pic.jpeg";
import { GiMoneyStack } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import Expenses from "../features/Expenses";
import Settings from "../features/Settings";

const Home = () => {
  const [isActive, setIsActive] = useState(true);
  const [isExpensesActive, setIsExpensesActive] = useState(false)
  const [isSettingsActive, setIsSettingsActive] = useState(true)

  const handleToggle = () => {
    setIsExpensesActive((prevExpensesActive) => !prevExpensesActive);
    setIsSettingsActive((prevSettingsActive) => !prevSettingsActive);
  };

  return (
    <div className="home-container">
      <div className="sidebar">
        <img src={profilePic} alt="" className="profile-pic" />
        <span>Example Username</span>
        <button className="feature-btn" onClick={handleToggle}>
          <GiMoneyStack className="feature-icon" /> Expenses
        </button>
        <button className="feature-btn" onClick={handleToggle}>
          <FiSettings className="feature-icon" /> Settings
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
