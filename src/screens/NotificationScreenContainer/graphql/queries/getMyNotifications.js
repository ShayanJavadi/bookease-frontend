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
`;

export default getMyNotifications;
