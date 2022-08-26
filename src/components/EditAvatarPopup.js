import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useInput from "../utils/hooks/useInput";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
}) {
  const inputAvatar = useInput({ inputValue: "" });
  const [isFormNotValid, setIsFormNotValid] = useState(true);

  useEffect(() => {
    inputAvatar.reset();
    setIsFormNotValid(true);
  }, [isOpen]);

  useEffect(() => {
    if (inputAvatar.isError || inputAvatar.value === "") {
      setIsFormNotValid(true);
    } else {
      setIsFormNotValid(false);
    }
  }, [inputAvatar.value]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({ avatar: inputAvatar.value });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isLoading={isLoading}
      isLoadingText="Сохраняю..."
      isFormNotValid={isFormNotValid}
    >
      <input
        className={`popup__input popup__input_avatar ${
          inputAvatar.isError ? "popup__input_type_error" : ""
        }`}
        name="avatar"
        id="avatar"
        type="url"
        placeholder="Ссылка на изображение"
        required
        value={inputAvatar.value}
        onChange={inputAvatar.handleChange}
      />

      <span className="popup__input-error avatar-error">
        {inputAvatar.errorMessage}
      </span>
    </PopupWithForm>
  );
}
