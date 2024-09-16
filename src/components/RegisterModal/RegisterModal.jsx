import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal";

function RegisterModal({ isOpen, onClose }) {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };
  return (
    <ModalWithForm
      title="Register"
      onSubmit={handleSubmit}
      onClose={onClose}
      required
    >
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setname(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Avatar Url"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        required
      />
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

export default RegisterModal;
