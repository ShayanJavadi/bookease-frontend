import gql from "graphql-tag";

const getSchoolNameQuery = gql`
  query getSchoolNameQuery($schoolId: ID!) {
    searchSchools(id: $schoolId, limit: 1) {
      name,
      address
    }
  }
`;

export default getSchoolNameQuery;
