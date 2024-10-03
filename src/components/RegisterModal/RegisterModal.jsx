import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal";
import "./RegisterModal.css";

function RegisterModal({
  isOpen,
  onClose,
  onRegisterSuccess,
  openLoginModal,
  handleSubmit,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const isFormValid = email && password && name && avatar;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const makeRequest = () => {
      return onRegisterSuccess({ name, email, password, avatar });
    };
    handleSubmit(makeRequest);
  };

  const handleLoginClick = () => {
    onClose();
    openLoginModal();
  };

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setEmail("");
      setPassword("");
      setAvatar("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="register"
      buttonText="Sign Up"
      onSubmit={handleFormSubmit}
      onClose={onClose}
      disabled={!isFormValid}
    >
      <label className="modal__label" htmlFor="email">
        Email*
      </label>
      <input
        name="email"
        className="modal__input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label className="modal__label" htmlFor="password">
        Password*
      </label>
      <input
        name="password"
        className="modal__input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label className="modal__label" htmlFor="name">
        Name*
      </label>
      <input
        name="name"
        className="modal__input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label className="modal__label" htmlFor="avatar">
        Avatar Url*
      </label>
      <input
        name="avatar"
        className="modal__input"
        type="url"
        placeholder="Avatar Url"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        required
      />
      <button
        className="modal__login-btn"
        type="button"
        onClick={handleLoginClick}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
