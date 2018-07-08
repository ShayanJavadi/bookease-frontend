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
          name,
        },
        photoURL,
      }
    }
  }
`;

export default getSessionQuery;
