import gql from "graphql-tag";

const lookupTextbooksQuery = gql`
  query lookupTextbooksQuery($query: String, $limit: Int) {
    lookupTextbooks (query: $query, limit: $limit) {
      totalItems
      textbooks {
        title
        description
        industryIdentifiers {
          type
          identifier
        }
        authors
        edition
      }
    }
  }
`;

export default lookupTextbooksQuery;
