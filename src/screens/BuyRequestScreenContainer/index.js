import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import queries from "./graphql/queries";
import BuyRequestScreen from "../BuyRequestScreen";

const { getTextbookQuery } = queries;

const mapStateToProps = () => ({}); // eslint-disable-line no-unused-vars

const Container = compose(
  graphql(getTextbookQuery, {
    options: props => ({ variables: { textbookId: props.textbookId || "" } }),
    name: "getTextbookQuery"
  }),
)

export default Container(connect(
  mapStateToProps,
)(BuyRequestScreen));
