import gql from "graphql-tag";

const getMyBuyRequestsQuery = gql`
  query getMyBuyRequests($limit: Int){
    getMyBuyRequests(limit: $limit){
        id,
        userId,
        isAccepted,
        textbook {
          id, 
          title,
          price,
          edition,
          industryIdentifiers{
              type,
              identifier
          },
          images{
              thumbnail
          },
          user {
            id,
            displayName,
            photoURL 
          },
          userId,
          createdAt,
          updatedAt,
          publishedAt,
        }
    }
  }
`;

export default getMyBuyRequestsQuery;
