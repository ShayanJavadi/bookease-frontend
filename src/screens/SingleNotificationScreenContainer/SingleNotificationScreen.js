import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import queries from "./graphql/queries";
import mutations from "./graphql/mutations";
import SingleNotificationScreen from "../SingleNotificationScreen";

const { getNotification } = queries;
const { updateBuyRequest } = mutations;

const mapStateToProps = () => ({}); // eslint-disable-line no-unused-vars

const Container = compose(
  graphql(getNotification, {
    options: props => ({ variables: { id: props.id || -1 } }),
    name: "getNotificationQuery"
  }),
  graphql(updateBuyRequest, {
    options: props => ({ variables: { buyRequest: props.buyRequest || {} } }),
    name: "updateBuyRequestMutation",
  }),
)

export default Container(connect(
  mapStateToProps,
)(SingleNotificationScreen));
