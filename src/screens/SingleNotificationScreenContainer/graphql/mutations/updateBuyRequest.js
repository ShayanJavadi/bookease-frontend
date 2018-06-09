import gql from "graphql-tag";

const updateBuyRequest = gql`
  mutation updateBuyRequest($buyRequest:BuyRequestInput){
    updateBuyRequest(buyRequest: $buyRequest) {
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
`;

export default updateBuyRequest;
