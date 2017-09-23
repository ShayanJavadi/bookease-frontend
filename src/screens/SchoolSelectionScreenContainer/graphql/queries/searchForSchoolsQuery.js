import gql from "graphql-tag";

const searchForSchoolsQuery = gql`
  query lookupTextbooksQuery($query: String!, $limit: Int) {
    searchSchools(name: $query, limit: $limit) {
      id,
      name,
      address
    }
  }
`;

export default searchForSchoolsQuery;
