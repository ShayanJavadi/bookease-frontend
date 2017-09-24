import gql from "graphql-tag";

const sendVerificationCodeMutation = gql`
  mutation sendVerificationCodeQuery($email: String!) {
    sendVerificationCodeToEmail(email: $email)
  }
`;

export default sendVerificationCodeMutation;
