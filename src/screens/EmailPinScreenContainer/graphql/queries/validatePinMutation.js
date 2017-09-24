import gql from "graphql-tag";

const validatePinMutation = gql`
  mutation verifyEmail($email: String!, $verificationCode: String!) {
    verifyEmail(email: $email, verificationCode: $verificationCode)
  }
`;

export default validatePinMutation;
