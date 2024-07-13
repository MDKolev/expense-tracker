import React from "react";
import "./settings.css";
import profilePic from "../../assets/profile-pic.jpeg";

const Settings = ({userEmail}) => {
  return (
    <>
      <div className="feature-header">
        <h1>Settings</h1>
      </div>
      <div className="settings-container">
        <div className="account-info">
          <div className="personal-info-container">
            <h2>Personal Information</h2>
            <h3>Username</h3>
            <p>username</p>
            <h3>Email</h3>
            <p>{userEmail}</p>
            <h3>Joined</h3>
            <p>30/06/2024</p>
          </div>
          <div className="profile-pic-container">
            <h2>Change Avatar</h2>
            <img src={profilePic} alt="" />
            <button className="save-btn">Save Avatar</button>
          </div>
        </div>

        <div className="appearance-container">
          <h2>Appearance</h2>
          <div className="appearance-modes">
            <div className="light">
              <p>Light</p>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="dark">
              <p>Dark</p>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="dawn">
              <p>Dawn</p>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
