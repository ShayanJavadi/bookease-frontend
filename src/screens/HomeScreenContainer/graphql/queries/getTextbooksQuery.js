import gql from "graphql-tag";

const getTextbooksQuery = gql`
  query getTextbooksQuery($query: String, $limit: Int, $offset: Int, $orderBy: String){
    getTextbooks(query: $query, limit: $limit, offset: $offset, orderBy: $orderBy){
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
