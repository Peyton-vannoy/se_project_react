import profilePicture from "../../images/profile-picture.jpg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import "./SideBar.css";

function SideBar() {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <img
        className="sidebar__profile-picture"
        src={currentUser?.avatar}
        alt={currentUser?.name}
      />
      <p className="sidebar__username">{currentUser?.name}</p>
    </div>
  );
}

export default SideBar;
