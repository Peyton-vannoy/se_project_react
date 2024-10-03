import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";
import { login } from "../../utils/auth";

function LoginModal({ isOpen, onClose, onLoginSuccess, openRegisterModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        onLoginSuccess(res);
        onClose();
      })
      .catch((err) => {
        console.error("Error logging in user:", err);
      });
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
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <label className="modal__label" htmlFor="email">
        Email*
      </label>
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
      <label className="modal__label" htmlFor="password">
        Password*
      </label>
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
