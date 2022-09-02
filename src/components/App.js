import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";

import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { auth } from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const history = useHistory();

  function tokenCheck() {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getToken(token)
        .then((res) => {
          if (res) {
            setUserEmail(res.data.email);
          }
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          setLoggedIn(false);
          history.push("/sign-in");
          console.log(`Ошибка ${err}`);
        });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  function onLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(email);
          history.push("/");
          localStorage.setItem("jwt", res.token);
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
        console.log(`Ошибка ${err}`);
      });
  }

  function onRegister({ email, password }) {
    auth
      .register(email, password)
      .then((data) => {
        if (data.email) {
          setUserEmail(email);
          history.push("/");
        }
        setIsInfoTooltipOpen(true);
        setIsSuccess(true);
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
        console.log(`Ошибка ${err}`);
      });
  }

  function onLogOut() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
    setLoggedIn(false);
  }

  function getUserInfo() {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function getInitialCards() {
    api
      .getInitialCards()
      .then(setCards)
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  useEffect(() => {
    if (isLoggedIn) {
      getInitialCards();
      getUserInfo();
    }
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsConfirmPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .setLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleCardDelete() {
    setIsLoading(true);

    api
      .deleteElementCard(selectedCard?._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== selectedCard?._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(info) {
    setIsLoading(true);

    api
      .editProfileInfo(info)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);

    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);

    api
      .addNewElementCard(cardData)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen ||
    isConfirmPopupOpen ||
    isInfoTooltipOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          onLogOut={onLogOut}
          userEmail={userEmail}
        />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            isLoggedIn={isLoggedIn}
          />

          <Route path="/sign-up">
            <Register onRegister={onRegister} />
          </Route>

          <Route path="/sign-in">
            <Login onLogin={onLogin} />
          </Route>
        </Switch>

        {isLoggedIn ? <Footer /> : null}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
