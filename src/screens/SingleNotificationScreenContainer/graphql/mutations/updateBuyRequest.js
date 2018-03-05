import gql from "graphql-tag";

const updateBuyRequest = gql`
  mutation updateBuyRequest($buyRequest:BuyRequestInput){
    updateBuyRequest(buyRequest: $buyRequest) {
      id
      isAccepted
      recipientId
      textbookId
      userId
      message
      notificationId
    }
  }
`;

export default updateBuyRequest;
