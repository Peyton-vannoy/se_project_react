import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  setIsLoggedIn,
  onUpdateSuccess,
}) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <div className="profile__sidebar-buttons">
          <button
            onClick={() => setIsEditProfileModalOpen(true)}
            className="profile__edit-button"
          >
            Change profile data
          </button>
          <button onClick={handleLogout} className="profile__logout-button">
            Log out
          </button>
        </div>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        onUpdateSuccess={onUpdateSuccess}
      />
    </div>
  );
}

export default Profile;
