import gql from "graphql-tag";

const getTextbooksQuery = gql`
  query getTextbooksQuery($query: String, $limit: Int, $offset: Int){
    getTextbooks(query: $query, limit: $limit, offset: $offset){
        id,
        title,
        price,
        uid,
        edition,
        condition,
        images{
            thumbnail
        },
        createdAt,
    }
  }
`;

export default getTextbooksQuery;
