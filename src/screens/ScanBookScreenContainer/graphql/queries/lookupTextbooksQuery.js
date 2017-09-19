import gql from 'graphql-tag';

const lookupTextbooksQuery = gql`
  query lookupTextbooksQuery($query: String, $limit: Int) {
    lookupTextbooks (query: $query, limit: $limit) {
      textbooks {
        id
        title
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
