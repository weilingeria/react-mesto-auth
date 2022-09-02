import successPic from "../images/success.svg";
import failPic from "../images/fail.svg";

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  const handleOverlayClose = (evt) =>
  evt.target === evt.currentTarget && onClose();

  return (
    <div className={`popup ${isOpen ? "popup_is-opened" : ""}`} onClick={handleOverlayClose}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <div className="popup__tooltip">
          <img
            className="popup__tooltip-img"
            src={isSuccess ? successPic : failPic}
            alt={isSuccess ? "Успешно!" : "Ошибка!"}
          />
          <p className="popup__tooltip-text">
            {isSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
      </div>
    </div>
  );
}
