import profilePicture from "../../images/profile-picture.jpg";

import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img
        className="sidebar__profile-picture"
        src={profilePicture}
        alt="profile picture"
      />
      <p className="sidebar__username">Peyton Vannoy</p>
    </div>
  );
}

export default SideBar;
