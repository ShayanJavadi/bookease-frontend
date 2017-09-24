/* eslint-disable prefer-const */
import {
  PIN_VALID,
  PIN_INVALID,
} from "./consts";

export const validatePin = ({ pin, identifier, verifier }) => async (dispatch) => {
  verifier({
    variables: {
      email: identifier,
      verificationCode: pin
    }
  })
  .then(() => dispatch({ type: PIN_VALID }))
  .catch(() => dispatch({ type: PIN_INVALID }));
}
