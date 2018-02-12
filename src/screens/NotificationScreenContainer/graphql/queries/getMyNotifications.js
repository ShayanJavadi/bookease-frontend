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
            textbookTitle,
            notificationId,
            recipientId,
            isAccepted,
            message,
          }
      }
  }
`;

export default getMyNotifications;
