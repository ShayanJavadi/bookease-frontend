/* eslint-disable prefer-const */
import {
  FULL_NAME_VALID,
  FULL_NAME_INVALID,
} from "./consts";

export const validateFullName = ({ fullName }) => (dispatch) => {
  const validationRegExp = /\S+\s+\S+/;
  const isValid = validationRegExp.test(fullName);

  if (isValid) {
    dispatch({ type: FULL_NAME_VALID });
  }
  else {
    dispatch({ type: FULL_NAME_INVALID });
  }
}
