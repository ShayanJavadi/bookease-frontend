import gql from "graphql-tag";

const signInWithEmailMutation = gql`
  mutation signInWithEmailMutation($email: String!, $password: String!) {
    signInWithEmail(email: $email, password: $password) {
      id
    }
  }
`;

export default signInWithEmailMutation;
