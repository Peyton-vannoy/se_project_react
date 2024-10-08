import "./ItemModal.css";
import closeItemIcon from "../../images/item-modal-close-btn.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({
  onClose,
  card,
  isOpen,
  openDeleteConfirmModal,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;

  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;

  const handleDeleteClick = () => {
    openDeleteConfirmModal(card);
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container modal__container_type_image">
        <div className="modal__content modal__content_type_image">
          <button onClick={onClose} type="button" className="modal__close">
            <img
              src={closeItemIcon}
              alt="Close"
              className="modal__close-image"
            />
          </button>
          <img src={card.imageUrl} alt={card.name} className="modal__image" />
          <div className="modal__footer">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
            {isLoggedIn && (
              <button
                type="button"
                className={itemDeleteButtonClassName}
                onClick={handleDeleteClick}
              >
                Delete item
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
