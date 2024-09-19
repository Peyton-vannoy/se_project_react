import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { login } from "../../utils/auth";

function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        onLoginSuccess();
        onClose();
      })
      .catch((err) => {
        console.error("Error logging in user:", err);
      });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Log in"
      buttonText="Next"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <label className="modal__label" htmlFor="email">
        Email*
      </label>
      <input
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
        className="modal__input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </ModalWithForm>
  );
}

export default LoginModal;
