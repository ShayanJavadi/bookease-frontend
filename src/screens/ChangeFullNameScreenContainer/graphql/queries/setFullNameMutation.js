import gql from "graphql-tag";

const setFullNameMutation = gql`
  mutation setFullNameMutation($email: String, $phoneNumber: String, $fullName: String) {
    updateProfile(email: $email, phoneNumber: $phoneNumber, displayName: $fullName) { id }
  }
`;

export default setFullNameMutation;
