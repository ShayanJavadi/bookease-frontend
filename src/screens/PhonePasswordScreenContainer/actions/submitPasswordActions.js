import {
  PASSWORD_ACCEPTED,
  PASSWORD_NOT_ACCEPTED,
} from "./consts";

const submitPassword = ({ password, profileData, submitter }) => (dispatch) => {
  return submitter({
    variables: {
      phoneNumber: profileData.phoneNumber,
      password: password
    }
  })
  .then(() => dispatch({ type: PASSWORD_ACCEPTED }))
  .catch(() => dispatch({ type: PASSWORD_NOT_ACCEPTED }));
}

export default submitPassword;
