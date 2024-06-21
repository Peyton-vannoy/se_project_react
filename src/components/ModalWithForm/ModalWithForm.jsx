import "./ModalWithForm.css";
import closeIcon from "../../images/modal-close-btn.svg";
function ModalWithForm({ children, buttonText, title, activeModal, onClose }) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" ? "modal_opened" : ""}`}
    >
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" className="modal__close-image" />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
