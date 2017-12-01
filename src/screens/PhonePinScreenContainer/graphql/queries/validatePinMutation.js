import gql from "graphql-tag";

const validatePinMutation = gql`
  mutation verifyPhoneNumber($phoneNumber: String!, $verificationCode: String!) {
    verifyPhoneNumber(phoneNumber: $phoneNumber, verificationCode: $verificationCode)
    signInWithPhoneNumber(phoneNumber: $phoneNumber, password: $verificationCode) { id }
  }
`;

export default validatePinMutation;
