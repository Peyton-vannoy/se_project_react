import React from "react";
import { Outlet, Link } from "react-router-dom";

import "./Header.css";
import headerLogo from "../../images/header-logo.svg";
import profilePicture from "../../images/profile-picture.jpg";
import ToggleSwitch from "../../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
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
      <button
        type="button"
        onClick={handleAddClick}
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Peyton Vannoy</p>
        <Link to="/profile">
          <img
            src={profilePicture}
            alt="Peyton Vannoy"
            className="header__profile-picture"
          />
        </Link>
      </div>
      <Outlet />
    </header>
  );
}

export default Header;
