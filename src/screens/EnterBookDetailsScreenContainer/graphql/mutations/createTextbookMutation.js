import gql from "graphql-tag";

const createTextbookMutation = gql`
  mutation createTextbookMutation($textbook: TextbookInput) {
    createTextbook(textbook: $textbook) {
      title,
      id,
      uid,
      description,
      authors
      edition
      condition
      price
      images {
        priority,
        thumbnail,
      },
    }
  }
`;

export default createTextbookMutation;
