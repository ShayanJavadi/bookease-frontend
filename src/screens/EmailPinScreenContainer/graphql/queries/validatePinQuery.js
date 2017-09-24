import gql from "graphql-tag";

const validatePinQuery = gql`
  query lookupTextbooksQuery($query: String!, $limit: Int) {
    searchSchools(name: $query, limit: $limit) {
      id,
      name,
      address
    }
  }
`;

export default validatePinQuery;
