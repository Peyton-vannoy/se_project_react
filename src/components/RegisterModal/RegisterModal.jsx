import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal";
import { register } from "../../utils/auth";

function RegisterModal({ isOpen, onClose, onRegisterSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password, avatar })
      .then((res) => {
        onRegisterSuccess(res);
        onClose();
      })
      .catch((err) => {
        console.error("Error registering user:", err);
      });
  };
  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign up"
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
      <label className="modal__label" htmlFor="name">
        Name*
      </label>
      <input
        className="modal__input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label className="modal__label" htmlFor="avatar">
        Avatar Url
      </label>
      <input
        className="modal__input"
        type="url"
        placeholder="Avatar Url"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        required
      />
    </ModalWithForm>
  );
}

export default RegisterModal;
