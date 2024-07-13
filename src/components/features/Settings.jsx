import React, { useEffect, useState } from "react";
import "./settings.css";
import profilePic from "../../assets/profile-pic.jpeg";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase-config/firebase.js";

const Settings = ({ userEmail, userCreationTime, imageURL, setImageURL }) => {
  const [profileImage, setProfileImage] = useState(null);

  const uploadFile = async () => {
    if (!profileImage) return;
    const storageRef = ref(storage, `profilePictures/${profileImage.name}`);

    try {
      await uploadBytes(storageRef, profileImage);
      const url = await getDownloadURL(storageRef);
      localStorage.setItem("lastUploadedImage", url);
      const retrievedUrl = localStorage.getItem("lastUploadedImage");
      setImageURL(retrievedUrl);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickOnInput = () => {
    document.getElementById("fileInput").click();
  }

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
            <p>{userCreationTime}</p>
          </div>
          <div className="profile-pic-container">
            <h2>Change Avatar</h2>
              <img
                src={imageURL || profilePic}
                alt=""
                type="file"
                className="profile-image"
                onClick={handleClickOnInput}
              />
            <input
              className="upload-file-input"
              type="file"
              id="fileInput"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            <button className="save-btn" onClick={uploadFile}>
              Save Avatar
            </button>
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
