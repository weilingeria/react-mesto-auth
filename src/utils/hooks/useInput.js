import { useState } from "react";

export default function useInput(inputValue) {
  const [value, setValue] = useState(inputValue);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const reset = () => {
    setValue("");
    setErrorMessage("");
    setIsError(false);
  };

  const handleChange = (evt) => {
    setValue(evt.target.value);
    setIsError(!evt.target.validity.valid);
    setErrorMessage(evt.target.validationMessage);
  };
  return { value, setValue, reset, handleChange, isError, errorMessage };
}
