import {
  PIN_VALID,
  PIN_INVALID,
} from "./consts";

export const validatePin = ({ pin, identifier, verifier }) => (dispatch) => {
  return verifier({
    variables: {
      phoneNumber: identifier,
      verificationCode: pin
    }
  })
  .then((response) => dispatch({ type: PIN_VALID, payload: { id: response.data.signInWithPhoneNumber.id, phoneNumber: identifier } }))
  .catch(() => dispatch({ type: PIN_INVALID }));
}
