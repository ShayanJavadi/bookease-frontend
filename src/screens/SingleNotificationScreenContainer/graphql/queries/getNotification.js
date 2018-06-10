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
            userPhoneNumber,
            recipientPhoneNumber,
            textbook {
              id,
              title,
              price,
            },
            notificationId,
            recipientId,
            isAccepted,
            isTextbookSold,
            message,
            recipientUser{
              id,
              displayName,
              photoURL,
            },
            isUserRequester,
          }
      }
  }
`;

export default getNotification;
