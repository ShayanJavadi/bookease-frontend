const submitFullName = ({ fullName, profileData, submitter }) => () => {
  submitter({
    variables: {
      phoneNumber: profileData.phoneNumber,
      fullName: fullName,
    }
  });
}

export default submitFullName;
