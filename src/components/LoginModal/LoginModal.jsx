import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";
import { login } from "../../utils/auth";

function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
  openRegisterModal,
  handleSubmit,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const makeRequest = () => {
      return Promise.resolve(login({ email, password })).then((res) => {
        localStorage.setItem("jwt", res.token);
        onLoginSuccess(res);
        onClose();
      });
    };
    handleSubmit(makeRequest);
  };

  const handleSignupClick = () => {
    onClose();
    openRegisterModal();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="login"
      buttonText="Log in"
      onSubmit={handleFormSubmit}
      onClose={onClose}
    >
      <label className="modal__label">
        Email*
        <input
          name="email"
          id="email"
          className="modal__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="modal__label">
        Password*
        <input
          name="password"
          id="password"
          className="modal__input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button
        type="button"
        className="modal__register-btn"
        onClick={handleSignupClick}
      >
        or Sign up
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
