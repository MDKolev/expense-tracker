import React from "react";
import "./home.css";
import profilePic from "../../assets/profile-pic.jpeg";
import { GiMoneyStack } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import Expenses from "../features/Expenses";

const Home = () => {
  return (
    <div className="home-container">
      <div className="sidebar">
        <img src={profilePic} alt="" className="profile-pic" />
        <span>Example Username</span>
        <button className="feature-btn">
          <GiMoneyStack className="feature-icon" /> Expenses
        </button>
        <button className="feature-btn">
          <FiSettings className="feature-icon" /> Settings
        </button>
      </div>

      <div className="feature-window">
        <Expenses/>
      </div>
    </div>
  );
};

export default Home;
