/* eslint-disable prefer-const */
import {
  PIN_VALID,
  PIN_INVALID,
} from "./consts";

export const validatePin = (value) => async (dispatch) => {
  const isValidPin = true;

  if(isValidPin) {
    dispatch({ type: PIN_VALID });
  }
  else {
    dispatch({ type: PIN_INVALID });
  }
};
