import gql from "graphql-tag";

const lookupTextbooksQuery = gql`
  query lookupTextbooksQuery($query: String, $limit: Int) {
    lookupTextbooks (query: $query, limit: $limit) {
      totalItems
      textbooks {
        id
        title
        uid
        description
        industryIdentifiers {
          type
          identifier
        }
        authors
        edition
        imageLinks {
          smallThumbnail
          thumbnail
        }
      }
    }
  }
`;

export default lookupTextbooksQuery;
