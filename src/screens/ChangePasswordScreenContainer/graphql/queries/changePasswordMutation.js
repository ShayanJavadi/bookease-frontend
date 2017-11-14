import gql from "graphql-tag";

const changePasswordMutation = gql`
  mutation changePasswordMutation($email: String, $phoneNumber: String, $password: String) {
    updateProfile(email: $email, phoneNumber: $phoneNumber, password: $password) { id }
  }
`;

export default changePasswordMutation;
