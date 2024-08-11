import React, { useEffect, useState } from "react";
import "./home.css";
import profilePic from "../../assets/profile-pic.jpeg";
import { GiMoneyStack } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import Expenses from "../features/Expenses";
import Settings from "../features/Settings";
import { IoLogOutOutline } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase-config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const Home = () => {
  const [isExpensesActive, setIsExpensesActive] = useState(true);
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userCreationTime, setUserCreationTime] = useState("");
  const [imageURL, setImageURL] = useState(null);

  const navigate = useNavigate();

  const handleToggleExpenses = () => {
      setIsExpensesActive(true);
      setIsSettingsActive(false);
  };

  const handleToggleSettings = () => {
    setIsExpensesActive(false);
    setIsSettingsActive(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username || "");
          setUserEmail(user.email);
          setUserCreationTime(user.metadata.creationTime);

          if (userData.profileImageUrl) {
            setImageURL(userData.profileImageUrl);
          }
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="home-container">
      <div className="sidebar">
        <div>
          <img src={imageURL || profilePic} alt="" className="profile-pic" />
          <span>{username || userEmail}</span>
          <button className="feature-btn" onClick={handleToggleExpenses}>
            <GiMoneyStack className="feature-icon" /> Expenses
          </button>
          <button className="feature-btn" onClick={handleToggleSettings}>
            <FiSettings className="feature-icon" /> Settings
          </button>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <IoLogOutOutline className="logout-icon" /> Logout
        </button>
      </div>

      <div className="feature-window">
        {isExpensesActive && <Expenses />}
        {isSettingsActive && (
          <Settings
            userEmail={userEmail}
            userCreationTime={userCreationTime}
            imageURL={imageURL}
            setImageURL={setImageURL}
            setUsernameInHome={setUsername} // Pass the setUsername function to update username in Home component
          />
        )}
      </div>
    </div>
  );
};

export default Home;
