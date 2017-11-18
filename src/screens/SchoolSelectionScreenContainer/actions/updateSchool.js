const updateSchool = ({ mutate, profileData, schoolId }) => () => {
  return mutate({
    variables: {
      email: profileData.email,
      phoneNumber: profileData.phoneNumber,
      schoolId: schoolId,
    }
  })
};

export default updateSchool;
