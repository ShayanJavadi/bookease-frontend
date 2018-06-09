import gql from "graphql-tag";

const updateBuyRequest = gql`
  mutation updateBuyRequest($buyRequest:BuyRequestInput){
      updateBuyRequest(buyRequest: $buyRequest) {
        id
      }
  }
`;

export default updateBuyRequest;
