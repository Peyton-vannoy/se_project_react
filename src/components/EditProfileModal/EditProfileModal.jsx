import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import * as api from "../../utils/api";

function EditProfileModal({ isOpen, onClose, updateUserProfile, isLoading }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name || "");
      setAvatar(currentUser?.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updating user profile with:", { name, avatar });
    updateUserProfile({ name, avatar })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error("Error updating user profile", err);
      });
  };
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Change profile data"
      buttonText={isLoading ? "Saving..." : "Save changes"}
    >
      <label className="modal__label" htmlFor="name">
        Name*
      </label>
      <input
        name="name"
        className="modal__input"
        type="text"
        id="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label className="modal__label" htmlFor="avatar">
        Avatar*
      </label>
      <input
        className="modal__input"
        name="avatar"
        type="url"
        id="avatar"
        placeholder="Avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        required
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;
