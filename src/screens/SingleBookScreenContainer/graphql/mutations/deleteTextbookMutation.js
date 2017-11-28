import gql from "graphql-tag";

const deleteTextbookMutation = gql`
  mutation deleteTextbook($textbookId: ID!){
    deleteTextbook(id: $textbookId)
  }
`;

export default deleteTextbookMutation;
