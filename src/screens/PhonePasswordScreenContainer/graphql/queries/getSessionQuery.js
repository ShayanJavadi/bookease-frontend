import gql from "graphql-tag";

const getSessionQuery = gql`
  query getSessionQuery {
    getSession {
      user {
        id,
        phoneNumber,
        displayName,
        schoolId,
      }
    }
  }
`;

export default getSessionQuery;
