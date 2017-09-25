/* eslint-disable prefer-const */
import {
  PHONE_VALID,
  PHONE_INVALID,
} from "./consts";

const validationRegExp = /-|\s|\(|\)/;

export const validatePhone = (value) => (dispatch) => {
  const cleanPhoneNumber = value.split(validationRegExp).join("");
  const isValidPhoneNumber = cleanPhoneNumber.length === 10;

  if(isValidPhoneNumber) {
    dispatch({ type: PHONE_VALID, payload: cleanPhoneNumber });
  }
  else {
    dispatch({ type: PHONE_INVALID, payload: cleanPhoneNumber });
  }
};
