import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  return (
    <li className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__description">
        <h2 className="element__title block">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={`element__like ${isLiked && "element__like_active"}`}
            type="button"
            onClick={handleLikeClick}
          />
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
      <button
        className={`element__delete ${isOwn && "element__delete_visible"}`}
        type="button"
        onClick={handleDeleteClick}
      />
    </li>
  );
}
