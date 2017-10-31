export const submitFullName = ({ password, profileData, submitter }) => (dispatch) => {
  submitter({
    variables: {
      email: profileData.email,
      phoneNumber: profileData.phoneNumber,
      password: password,
    }
  });
}
