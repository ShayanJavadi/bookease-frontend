import gql from "graphql-tag";

const getNotification = gql`
  query getNotification($id:ID!){
      getNotification(id:$id){
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
          buyRequest {
            id,
            userId,
            textbookId,
            textbook {
              title,
              price,
            },
            notificationId,
            recipientId,
            isAccepted,
            isTextbookSold,
            message,
          }
      }
  }
`;

export default getNotification;
