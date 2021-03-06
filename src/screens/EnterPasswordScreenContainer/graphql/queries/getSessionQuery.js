import gql from "graphql-tag";

const getSessionQuery = gql`
  query getSessionQuery {
    getSession {
      user {
        id,
        phoneNumber,
        displayName,
        schoolId,
        school {
          id,
          name,
        },
      }
    }
  }
`;

export default getSessionQuery;
