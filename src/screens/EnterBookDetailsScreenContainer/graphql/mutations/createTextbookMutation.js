import gql from "graphql-tag";

const createTextbookMutation = gql`
  mutation createTextbookMutation($textbook: TextbookInput) {
    createTextbook(textbook: $textbook) {
      title
    }
  }
`;

export default createTextbookMutation;
