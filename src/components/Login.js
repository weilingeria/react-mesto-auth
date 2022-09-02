import useInput from "../utils/hooks/useInput";
import { useEffect, useState } from "react";

export default function Login({ onLogin }) {
  const inputEmail = useInput({ inputValue: "" });
  const inputPassword = useInput({ inputValue: "" });

  const [isFormNotValid, setIsFormNotValid] = useState(true);

  useEffect(() => {
    inputEmail.reset();
    inputPassword.reset();
    setIsFormNotValid(true);
  }, []);

  useEffect(() => {
    if (
      inputEmail.isError ||
      inputEmail.value === "" ||
      inputPassword.isError ||
      inputPassword.value === ""
    ) {
      setIsFormNotValid(true);
    } else {
      setIsFormNotValid(false);
    }
  }, [inputEmail.value, inputPassword.value]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onLogin({ email: inputEmail.value, password: inputPassword.value });
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" noValidate onSubmit={handleSubmit}>
        <input
          className="auth__input"
          name="email"
          type="email"
          minLength="2"
          maxLength="40"
          placeholder="Email"
          required
          value={inputEmail.value ?? ""}
          onChange={inputEmail.handleChange}
        />
        <span className="auth__input-error"></span>
        <input
          className="auth__input"
          name="password"
          type="text"
          minLength="2"
          maxLength="40"
          placeholder="Пароль"
          required
          value={inputPassword.value ?? ""}
          onChange={inputPassword.handleChange}
        />
        <span className="auth__input-error"></span>
        <button className="auth__button">Войти</button>
      </form>
    </div>
  );
}
