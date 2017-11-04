/* eslint-disable prefer-const */
import {
  PASSWORD_VALID,
  PASSWORD_INVALID,
} from "./consts";

export const validatePassword = ({ password, }) => (dispatch) => {
  const MINIMUM_PASSWORD_LENGTH = 1;

  if (password.length < MINIMUM_PASSWORD_LENGTH) {
    dispatch({ type: PASSWORD_INVALID });
  }
  else {
    dispatch({ type: PASSWORD_VALID });
  }
}
