import gql from "graphql-tag";

const updateNotification = gql`
  mutation updateNotification($notification: NotificationInput){
    updateNotification(notification: $notification){
      id,
      userId,
      senderId
      textbookId,
      message,
      type,
      isRead,
    }
  }
`;

export default updateNotification;
