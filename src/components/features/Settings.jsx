import React, { useEffect, useState } from "react";
import "./settings.css";
import profilePic from "../../assets/profile-pic.jpeg";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, auth, db } from "../../firebase-config/firebase.js";
import { doc, setDoc } from "firebase/firestore";

const Settings = ({
  userEmail,
  userCreationTime,
  imageURL,
  setImageURL,
  setUsernameInHome,
}) => {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [theme, setTheme] = useState(null);

  const handleUploadImage = async () => {
    if (!profileImage) return;

    const user = auth.currentUser;
    if (!user) return;
    const userUID = localStorage.getItem("currentUserID");
    if ((user.uid = userUID)) {
      const storageRef = ref(
        storage,
        `profilePictures/${user.uid}/${profileImage.name}`
      );

      try {
        await uploadBytes(storageRef, profileImage);
        const downloadURL = await getDownloadURL(storageRef);
        console.log("File available at", downloadURL);

        await setDoc(
          doc(db, "users", user.uid),
          { profileImageUrl: downloadURL },
          { merge: true }
        );

        setImageURL(downloadURL);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleClickOnInput = () => {
    document.getElementById("fileInput").click();
  };

  const handleClick = async () => {
    if (username.trim() !== "") {
      const user = auth.currentUser;
      if (user) {
        try {
          await setDoc(
            doc(db, "users", user.uid),
            { username },
            { merge: true }
          );

          setIsUsernameSet(true);
          setUsernameInHome(username);
        } catch (err) {
          console.error("Error updating username: ", err);
        }
      }
    } else {
      alert("Please enter a username.");
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme)
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    const storedTheme = localStorage.getItem("theme", theme);    
    setTheme(storedTheme);
  }, [theme]);

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
            <div className="username-container">
              {!isUsernameSet ? (
                <>
                  <input
                    type="text"
                    placeholder="set your username"
                    className="username-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <button className="username-button" onClick={handleClick}>
                    Set Username
                  </button>
                </>
              ) : (
                <p>
                  <strong>{username}</strong>
                </p>
              )}
            </div>
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
            <button className="save-btn" onClick={handleUploadImage}>
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
                <input
                  type="radio"
                  name="theme"
                  checked={theme === "light"}
                  onChange={() => handleThemeChange("light")}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="dark">
              <p>Dark</p>
              <label className="switch">
                <input
                  type="radio"
                  name="theme"
                  checked={theme === "dark"}
                  onChange={() => handleThemeChange("dark")}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="dawn">
              <p>Dawn</p>
              <label className="switch">
                <input
                  type="radio"
                  name="theme"
                  checked={theme === "dawn"}
                  onChange={() => handleThemeChange("dawn")}
                />
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
