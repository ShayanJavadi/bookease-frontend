import gql from "graphql-tag";

const changeSchoolMutation = gql`
  mutation changeSchoolMutation($email: String, $phoneNumber: String, $schoolId: ID) {
    updateProfile(email: $email, phoneNumber: $phoneNumber, schoolId: $schoolId) { id }
  }
`;

export default changeSchoolMutation;
