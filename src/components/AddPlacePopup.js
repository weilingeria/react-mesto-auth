import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import useInput from "../utils/hooks/useInput";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isLoading,
}) {
  const inputTitle = useInput({ inputValue: "" });
  const inputLink = useInput({ inputValue: "" });

  const [isFormNotValid, setIsFormNotValid] = useState(true);

  useEffect(() => {
    inputTitle.reset();
    inputLink.reset();
    setIsFormNotValid(true);
  }, [isOpen]);

  useEffect(() => {
    if (
      inputTitle.isError ||
      inputTitle.value === "" ||
      inputLink.isError ||
      inputLink.value === ""
    ) {
      setIsFormNotValid(true);
    } else {
      setIsFormNotValid(false);
    }
  }, [inputTitle.value, inputLink.value]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({ name: inputTitle.value, link: inputLink.value });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="add-cards"
      title="Новая карточка"
      buttonText="Создать"
      isLoading={isLoading}
      isLoadingText="Создаю..."
      isFormNotValid={isFormNotValid}
    >
      <input
        type="text"
        className={`popup__input popup__input_type_title ${
          inputTitle.isError ? "popup__input_type_error" : ""
        }`}
        name="elementTitle"
        id="elementTitle"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={inputTitle.value ?? ""}
        onChange={inputTitle.handleChange}
      />

      <span className="popup__input-error elementTitle-error">
        {inputTitle.errorMessage}
      </span>

      <input
        type="url"
        className={`popup__input popup__input_type_link ${
          inputLink.isError ? "popup__input_type_error" : ""
        }`}
        name="elementLink"
        id="elementLink"
        placeholder="Укажите ссылку"
        required
        value={inputLink.value ?? ""}
        onChange={inputLink.handleChange}
      />

      <span className="popup__input-error elementLink-error">
        {inputLink.errorMessage}
      </span>
    </PopupWithForm>
  );
}
