/* eslint-disable prefer-const */
import {
  PASSWORD_ACCEPTED,
  PASSWORD_NOT_ACCEPTED,
} from "./consts";

export const submitPassword = ({ password, identifier, submitter }) => (dispatch) => {
  return submitter({
    variables: {
      identifier: identifier,
      password: password
    }
  })
  .then(() => dispatch({ type: PASSWORD_ACCEPTED }))
  .catch(() => dispatch({ type: PASSWORD_NOT_ACCEPTED }));
}
