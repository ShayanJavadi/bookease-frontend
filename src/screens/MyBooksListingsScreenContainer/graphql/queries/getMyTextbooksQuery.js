import gql from "graphql-tag";

const getMyTextbooksQuery = gql`
  query getMyTextbooks($query: String, $limit: Int, $offset: Int){
    getMyTextbooks(query: $query, limit: $limit, offset: $offset){
        id,
        title,
        price,
        uid,
        description,
        edition,
        industryIdentifiers{
            type,
            identifier
        },
        images{
            thumbnail
        },
        authors,
        userId,
        createdAt,
        updatedAt,
        publishedAt,
        isArchived,
        isSold,
        buyRequestNotifications {
          id,
          userId,
          textbookId,
          senderId
          message
          type,
          isRead,
          createdAt,
          user{
            id,
            displayName,
            photoURL,
          },
          buyRequest{
            id,
            userId,
            textbookId,
            textbook{
              id,
              title,
              price
            },
            notificationId,
            recipientId,
            isAccepted,
            message,
          },
        }
    }
  }
`;

export default getMyTextbooksQuery;
