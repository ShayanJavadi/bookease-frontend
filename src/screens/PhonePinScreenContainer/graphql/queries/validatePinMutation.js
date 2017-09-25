import gql from "graphql-tag";

const validatePinMutation = gql`
  mutation verifyPhoneNumber($identifier: String!, $verificationCode: String!) {
    verifyPhoneNumber(phoneNumber: $identifier, verificationCode: $verificationCode)
  }
`;

export default validatePinMutation;
