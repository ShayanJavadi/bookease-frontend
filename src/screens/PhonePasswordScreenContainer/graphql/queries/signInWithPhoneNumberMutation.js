import gql from "graphql-tag";

const signInWithPhoneNumberMutation = gql`
  mutation signInWithPhoneNumber($identifier: String!, $password: String!) {
    signInWithPhoneNumber(phoneNumber: $identifier, password: $password)
  }
`;

export default signInWithPhoneNumberMutation;
