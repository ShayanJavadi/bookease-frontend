import gql from "graphql-tag";

const signInWithPhoneNumberMutation = gql`
  mutation signInWithPhoneNumber($phoneNumber: String!, $password: String!) {
    signInWithPhoneNumber(phoneNumber: $phoneNumber, password: $password) {
      id
    }
  }
`;

export default signInWithPhoneNumberMutation;
