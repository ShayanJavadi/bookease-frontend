import gql from "graphql-tag";

const validatePinMutation = gql`
  mutation verifyEmail($email: String!, $verificationCode: String!) {
    verifyEmail(email: $email, verificationCode: $verificationCode)
    signInWithEmail(email: $email, password: $verificationCode) { id }
  }
`;

export default validatePinMutation;
