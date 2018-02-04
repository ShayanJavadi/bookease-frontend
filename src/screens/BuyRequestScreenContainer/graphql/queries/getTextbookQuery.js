import gql from "graphql-tag";

const getTextbookQuery = gql`
  query getTextbookQuery($textbookId: ID!){
    getTextbook(textbookId: $textbookId){
        id,
        title,
        price,
        images{
            thumbnail
        },
        userId,
    }
  }
`;

export default getTextbookQuery;
