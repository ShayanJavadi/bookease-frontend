import gql from "graphql-tag";

const changePasswordMutation = gql`
  mutation changePasswordMutation($phoneNumber: String, $password: String) {
    updateProfile(phoneNumber: $phoneNumber, password: $password) { id }
  }
`;

export default changePasswordMutation;
