export default function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  buttonText,
  onSubmit,
  isLoading,
  isLoadingText,
  isConfirmDelete,
  isFormNotValid,
}) {
  const handleOverlayClose = (evt) =>
    evt.target === evt.currentTarget && onClose();

  return (
    <div
      className={`popup popup_${name} ${isOpen ? "popup_is-opened" : ""}`}
      onClick={handleOverlayClose}
    >
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={`${name}-form`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            className={`popup__save ${
              isConfirmDelete ? "popup__save_confirm-delete" : ""
            }  ${isFormNotValid ? "popup__save_disabled" : ""}`}
            type="submit"
            disabled={isFormNotValid}
          >
            {isLoading ? isLoadingText : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
