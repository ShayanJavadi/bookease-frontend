import gql from "graphql-tag";

const createTextbookSale = gql`
  mutation createTextbookSale($textbookSale:TextbookSaleInput){
    createTextbookSale(textbookSale: $textbookSale) {
      id
      sellerId
      buyerId
      textbookId
    }
  }
`;

export default createTextbookSale;
