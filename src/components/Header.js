import React, { useState } from "react";
import logo from "../images/logo.svg";
import { Link, Switch, Route } from "react-router-dom";
import closePic from "../images/Close.svg";
import burgerPic from "../images/burger-button.svg";

export default function Header({ isLoggedIn, onLogOut, userEmail }) {
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => {
    setMenuOpened((state) => !state);
  };

  const handleLogOut = () => {
    setMenuOpened(false);
    onLogOut();
  };

  return (
    <header className="header">
      <div className="header__container">
      <img className="header__logo" src={logo} alt="Лого Место" />
      <Switch>
        <Route path="/sign-up">
          <Link to="sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link to="sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/">
          {isLoggedIn && (
            <button
              className="header__burger-button"
              type="button"
              style={{
                backgroundImage: `url(${menuOpened ? closePic : burgerPic})`,
              }}
              onClick={toggleMenu}
            />
          )}
        </Route>
      </Switch>
      </div>
      <div className={`header__nav ${!menuOpened && "header__nav_hidden"}`}>
        {isLoggedIn && <span className="header__userEmail">{userEmail}</span>}
        {isLoggedIn && (
          <button
            className="header__exit-button"
            type="button"
            onClick={handleLogOut}
          >
            Выйти
          </button>
        )}
      </div>
    </header>
  );
}
