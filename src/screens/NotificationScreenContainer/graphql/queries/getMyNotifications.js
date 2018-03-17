import gql from "graphql-tag";

const getMyNotifications = gql`
  query getMyNotifications($limit:Int){
      getMyNotifications(limit:$limit){
          id,
          userId,
          textbookId,
          senderId
          message
          type,
          isRead,
          createdAt,
          buyRequest {
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
          }
      }
  }
`;

export default getMyNotifications;