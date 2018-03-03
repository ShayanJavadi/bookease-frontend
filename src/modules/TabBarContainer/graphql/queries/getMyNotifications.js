import gql from "graphql-tag";

const getMyNotifications = gql`
  query getMyNotifications($limit:Int){
      getMyNotifications(limit:$limit){
          userId,
          textbookId,
          senderId
          message
          type
          isRead,
          buyRequest {
            id,
            userId,
            textbookId,
            notificationId,
            recipientId,
            isAccepted,
            message,
          }
      }
  }
`;

export default getMyNotifications;
