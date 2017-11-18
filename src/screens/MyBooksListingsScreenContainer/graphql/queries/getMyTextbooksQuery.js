import gql from "graphql-tag";

const getMyTextbooksQuery = gql`
  query getMyTextbooks($query: String, $limit: Int, $offset: Int){
    getMyTextbooks(query: $query, limit: $limit, offset: $offset){
        id,
        title,
        price,
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
    }
  }
`;

export default getMyTextbooksQuery;
