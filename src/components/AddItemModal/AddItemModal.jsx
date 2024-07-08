import React, { useEffect, useState } from "react";
import ModalWithForm from "../../components/ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, closeActiveModal, onAddItem }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    setName("");
    setImageUrl("");
    setWeather("");
  }, [isOpen]);

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    console.log(e.target.value);
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      onClose={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        {" Name "}
        <input
          name="name"
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label className="modal__label">
        {" Image "}
        <input
          name="imageUrl"
          type="url"
          className="modal__input"
          id="imageURL"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__label modal__label_type_radio">
          <input
            name="temperature"
            id="hot"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            value="hot"
          />
          Hot
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            name="temperature"
            id="warm"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            value="warm"
          />
          Warm
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            name="temperature"
            id="cold"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            value="cold"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
