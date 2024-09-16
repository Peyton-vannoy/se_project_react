import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import headerLogo from "../../images/header-logo.svg";
import profilePicture from "../../images/profile-picture.jpg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData, isLoggedIn, currentUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to={"/"}>
        <img src={headerLogo} alt="Logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <div className="header__user-container">
        {isLoggedIn ? (
          <>
            <button
              type="button"
              onClick={handleAddClick}
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            <p className="header__username">{currentUser.name}</p>
            <Link to="/profile">
              <img
                src={currentUser.avatar || profilePicture}
                alt={currentUser.name}
                className="header__profile-picture"
              />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="header__login-btn">
              Log in
            </Link>
            <Link to="/register" className="header__register-btn">
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
