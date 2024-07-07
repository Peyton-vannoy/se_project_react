import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ onCardClick, handleAddClick, clothingItems }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <secion className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          onClick={handleAddClick}
          clothingItems={clothingItems}
        />
      </secion>
    </div>
  );
}

export default Profile;
