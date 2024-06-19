import "./Header.css";
import headerlogo from "../../images/header-logo.svg";
import profilepicture from "../../images/profile-picture.jpg";

function Header() {
  return (
    <header className="header">
      <img src={headerlogo} alt="Logo" className="header__logo" />
      <p className="header__date-and-location">DATE, LOCATION</p>
      <button className="header__add-clothes-btn">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Peyton Vannoy</p>
        <img
          src={profilepicture}
          alt="Peyton Vannoy"
          className="header__profile-picture"
        />
      </div>
    </header>
  );
}

export default Header;
