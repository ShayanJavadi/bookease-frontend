import gql from "graphql-tag";

const getTextbookQuery = gql`
  query getTextbookQuery($textbookId: ID!){
    getTextbook(textbookId: $textbookId){
        id,
        title,
        price,
        uid,
        description,
        edition,
        condition,
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
        user {
          id,
          displayName,
          photoURL,
        },
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

export default getTextbookQuery;
