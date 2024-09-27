import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import headerLogo from "../../images/header-logo.svg";
import profilePicture from "../../images/profile-picture.jpg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  setRegisterModalOpen,
  setLoginModalOpen,
}) {
  const { currentUser } = useContext(CurrentUserContext);
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
            {currentUser.avatar ? (
              <Link to="/profile">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="header__profile-picture"
                />
              </Link>
            ) : (
              <div className="header__profile-placeholder">
                {currentUser.name?.charAt(0)}
              </div>
            )}
            <p className="header__username">{currentUser?.name}</p>
          </>
        ) : (
          <div className="header__auth-buttons">
            <button
              onClick={() => setRegisterModalOpen(true)}
              className="header__button"
            >
              Sign up
            </button>
            <button
              onClick={() => setLoginModalOpen(true)}
              className="header__button"
            >
              Log in
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
