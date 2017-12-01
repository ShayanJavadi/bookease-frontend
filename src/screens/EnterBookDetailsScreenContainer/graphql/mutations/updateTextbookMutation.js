import gql from "graphql-tag";

const updateTextbookMutation = gql`
  mutation updateTextbook($textbook: TextbookInput){
      updateTextbook(textbook: $textbook) {
          id,
          title,
          uid,
          description,
          edition,
          industryIdentifiers{
              type,
              identifier
          },
          images{
              thumbnail
          },
          authors,
          condition,
          price
      }
  }
`;

export default updateTextbookMutation;
