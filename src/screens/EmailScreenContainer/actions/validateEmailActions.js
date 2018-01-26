import {
  EMAIL_VALID,
  EMAIL_INVALID,
} from "./consts";

const validationRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateEmail = (value) => (dispatch) => {
  const isValidEmail = validationRegExp.test(value);

  if (isValidEmail) {
    dispatch({ type: EMAIL_VALID });
  }
  else {
    dispatch({ type: EMAIL_INVALID });
  }
};
