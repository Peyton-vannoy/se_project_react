import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { updateUserProfile } from "../../utils/api";

function EditProfileModal({ isOpen, onClose, onUpdateSuccess }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name || "");
  const [avatar, setAvatar] = useState(currentUser.avatar || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({ name, avatar })
      .then((updatedUser) => {
        onUpdateSuccess(updatedUser);
        onClose();
      })
      .catch((err) => {
        console.error("Error updating user profile:", err);
      });
  };
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Change profile data"
      buttonText="Save changes"
    >
      <label className="modal__label" htmlFor="name">
        Name*
      </label>
      <input
        className="modal__input"
        type="text"
        id="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label className="modal__label" htmlFor="avatar">
        Avatar
      </label>
      <input
        className="modal__input"
        type="url"
        id="avatar"
        placeholder="Avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;
