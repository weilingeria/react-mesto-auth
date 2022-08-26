import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmPopup({
  isOpen,
  onClose,
  onCardDelete,
  isLoading,
}) {
  function handleSubmit(evt) {
    evt.preventDefault();

    onCardDelete();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="confirm-delete"
      title="Точно удалить?"
      buttonText="Да"
      isLoading={isLoading}
      isLoadingText="Удаляю..."
      isConfirmDelete={true}
    />
  );
}
