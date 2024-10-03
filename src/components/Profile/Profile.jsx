import { useState, useContext } from "react";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../utils/api";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  setIsLoggedIn,
  onUpdateSuccess,
  onCardLike,
  isLoggedIn,
  isLoading,
  handleSubmit,
  updateUserProfile,
}) {
  // const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/");
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
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn}
          handleSubmit={handleSubmit}
        />
      </section>
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        onUpdateSuccess={onUpdateSuccess}
        updateUserProfile={updateUserProfile}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Profile;
