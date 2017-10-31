/* eslint-disable prefer-const */
import {
  PASSWORD_ACCEPTED,
  PASSWORD_NOT_ACCEPTED,
} from "./consts";

export const submitPassword = ({ password, profileData, submitter }) => (dispatch) => {
  submitter({
    variables: {
      email: profileData.email,
      phoneNumber: profileData.phoneNumber,
      password: password,
    }
  })
  .then(() => dispatch({ type: PASSWORD_ACCEPTED }))
  .catch(() => dispatch({ type: PASSWORD_NOT_ACCEPTED }));
}
