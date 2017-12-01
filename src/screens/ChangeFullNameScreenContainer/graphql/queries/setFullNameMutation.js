import gql from "graphql-tag";

const setFullNameMutation = gql`
  mutation setFullNameMutation($phoneNumber: String, $fullName: String) {
    updateProfile(phoneNumber: $phoneNumber, displayName: $fullName) { id }
  }
`;

export default setFullNameMutation;
