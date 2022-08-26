import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__card">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          >
            <button
              className="profile__avatar-button"
              type="button"
              onClick={onEditAvatar}
            />
          </div>
          <div className="profile__info">
            <div className="profile__column">
              <h1 className="profile__name block">{currentUser.name}</h1>
              <p className="profile__description block">{currentUser.about}</p>
            </div>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            />
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
