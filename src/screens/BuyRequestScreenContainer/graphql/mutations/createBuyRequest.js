import gql from "graphql-tag";

const createBuyRequest = gql`
  mutation createBuyRequest($buyRequest:BuyRequestInput){
      createBuyRequest(buyRequest: $buyRequest) {
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

export default createBuyRequest;
