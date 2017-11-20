import gql from "graphql-tag";

const getTextbookQuery = gql`
  query getTextbookQuery($textbookId: ID!){
    getTextbook(textbookId: $textbookId){
        id,
        title,
        price,
        uid,
        description,
        edition,
        condition,
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
    }
  }
`;

export default getTextbookQuery;
