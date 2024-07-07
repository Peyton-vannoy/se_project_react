import "./ItemModal.css";
import closeItemIcon from "../../images/item-modal-close-btn.svg";

function ItemModal({ onClose, card, isOpen, handleDeleteClick }) {
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
            <button
              type="button"
              className="modal__delete"
              onClick={handleDeleteClick}
            >
              Delete item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
