import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

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
      title="Login"
      buttonText="Login"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
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
