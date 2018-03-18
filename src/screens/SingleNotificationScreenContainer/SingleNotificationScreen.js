import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import queries from "./graphql/queries";
import mutations from "./graphql/mutations";
import SingleNotificationScreen from "../SingleNotificationScreen";

const { getNotification } = queries;
const { updateBuyRequest, createTextbookSale } = mutations;

const mapStateToProps = () => ({}); // eslint-disable-line no-unused-vars

const Container = compose(
  graphql(getNotification, {
    options: props => ({ variables: { id: props.id || -1 } }),
    name: "getNotification"
  }),
  graphql(createTextbookSale, {
    options: props => ({ variables: { textbookSale: props.textbookSale || {} } }),
    name: "createTextbookSale",
  }),
  graphql(updateBuyRequest, {
    options: props => ({ variables: { buyRequest: props.buyRequest || {} } }),
    name: "updateBuyRequest",
  }),

)

export default Container(connect(
  mapStateToProps,
)(SingleNotificationScreen));
