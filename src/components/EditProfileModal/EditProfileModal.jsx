import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import * as api from "../../utils/api";

function EditProfileModal({
  isOpen,
  onClose,
  updateUserProfile,
  isLoading,
  handleSubmit,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name || "");
      setAvatar(currentUser?.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const makeRequest = () => {
      return Promise.resolve(updateUserProfile({ name, avatar })).then(() => {
        onClose();
      });
    };
    handleSubmit(makeRequest);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      title="Change profile data"
      buttonText={isLoading ? "Saving..." : "Save changes"}
    >
      <label className="modal__label" htmlFor="name">
        Name*
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
      </label>
      <label className="modal__label" htmlFor="avatar">
        Avatar*
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
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
