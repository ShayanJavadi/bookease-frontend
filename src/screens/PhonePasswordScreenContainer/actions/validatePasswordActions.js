/* eslint-disable prefer-const */
import {
  PASSWORD_VALID,
  PASSWORD_INVALID,
} from "./consts";

export const validatePassword = ({ password, identifier, verifier }) => (dispatch) => {
  verifier({
    variables: {
      identifier: identifier,
      password: password
    }
  })
  .then(() => dispatch({ type: PASSWORD_VALID }))
  .catch(() => dispatch({ type: PASSWORD_INVALID }));
}
