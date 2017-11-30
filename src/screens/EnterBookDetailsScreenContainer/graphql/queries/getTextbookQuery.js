import gql from "graphql-tag";

const getTextbookQuery = gql`
  query getTextbook($textbookId: ID!){
    getTextbook(textbookId: $textbookId){
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
        userId,
        createdAt,
        updatedAt,
        publishedAt,
        condition,
        price
    }
  }
`;

export default getTextbookQuery;
