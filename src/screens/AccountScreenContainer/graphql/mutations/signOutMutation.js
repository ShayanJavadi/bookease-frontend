import gql from "graphql-tag";

const signOutMutation = gql`
  mutation signOutMutation{
    signOut
  }
`;

export default signOutMutation;
