import gql from "graphql-tag";

const sendVerificationCodeMutation = gql`
  mutation sendVerificationCodeQuery($phoneNumber: String!) {
    sendVerificationCodeToPhoneNumber(phoneNumber: $phoneNumber)
  }
`;

export default sendVerificationCodeMutation;
