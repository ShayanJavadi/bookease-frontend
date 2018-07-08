import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import queries from "./graphql/queries";
import mutations from "./graphql/mutations";
import BuyRequestScreen from "../BuyRequestScreen";

const { getTextbookQuery } = queries;
const { createBuyRequest, updateBuyRequest } = mutations;

const mapStateToProps = () => ({}); // eslint-disable-line no-unused-vars

const Container = compose(
  graphql(getTextbookQuery, {
    options: props => ({ variables: { textbookId: props.textbookId || "" } }),
    name: "getTextbookQuery"
  }),
  graphql(createBuyRequest, {
    options: props => ({ variables: { buyRequest: props.buyRequest || {} } }),
    name: "createBuyRequestMutation"
  }),
  graphql(updateBuyRequest, {
    options: props => ({ variables: { buyRequest: props.buyRequest || {} } }),
    name: "updateBuyRequestMutation"
  }),
)

export default Container(connect(
  mapStateToProps,
)(BuyRequestScreen));
