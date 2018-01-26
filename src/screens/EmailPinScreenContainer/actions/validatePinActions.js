import {
  PIN_VALID,
  PIN_INVALID,
} from "./consts";

export const validatePin = ({ pin, identifier, verifier }) => (dispatch) => {
  verifier({
    variables: {
      email: identifier,
      verificationCode: pin
    }
  })
  .then((response) => dispatch({ type: PIN_VALID, payload: { id: response.data.signInWithEmail.id, email: identifier } }))
  .catch(() => dispatch({ type: PIN_INVALID }));
}
