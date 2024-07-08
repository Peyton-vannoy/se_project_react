import "./DeleteConfirmModal.css";
import closeItemIcon from "../../images/item-modal-close-btn.svg";

function DeleteConfirmModal({ isOpen, handleCloseClick, onDelete, card }) {
  return (
    <div className={`modal ${isOpen === "delete-garment" && "modal_opened"}`}>
      <div className="modal__content modal_content_type_delete">
        <button
          onClick={handleCloseClick}
          className="modal__close"
          type="button"
        >
          <img src={closeItemIcon} alt="close" />
        </button>
        <p className="modal__heading-delete">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          onClick={() => onDelete(card)}
          className="modal__delete-confirm"
          type="submit"
        >
          Yes, delete item
        </button>
        <button
          onClick={handleCloseClick}
          type="submit"
          className="modal__delete-cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
