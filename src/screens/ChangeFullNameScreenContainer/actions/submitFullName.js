const submitFullName = ({ password, profileData, submitter }) => () => {
  submitter({
    variables: {
      email: profileData.email,
      phoneNumber: profileData.phoneNumber,
      password: password,
    }
  });
}

export default submitFullName;
