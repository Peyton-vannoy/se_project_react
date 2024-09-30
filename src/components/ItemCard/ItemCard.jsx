import "./ItemCard.css";
import likeImg from "../../images/like__btn-active.svg";
import unlikeImg from "../../images/like__btn-inactive.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(item.likes.some((id) => id === currentUser._id));
  }, [item.likes, currentUser._id]);

  const likeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleLikeClick = () => {
    onCardLike({ itemId: item._id, isLiked });
  };

  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <li className="card">
      <div className="card__title-container">
        <h2 className="card__title-heading">{item.name}</h2>
        {currentUser && (
          <img
            src={isLiked ? likeImg : unlikeImg}
            className={likeButtonClassName}
            onClick={handleLikeClick}
          />
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
