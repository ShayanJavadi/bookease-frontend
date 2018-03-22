import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import queries from "./graphql/queries";
import HomeScreen from "../HomeScreen";

const { getTextbooksQuery } = queries;
const mapStateToProps = ({ MyBooksListingsReducer }) => ({}); // eslint-disable-line no-unused-vars

const Container = compose(
  graphql(getTextbooksQuery, {
    options: props => ({ variables: { query: props.query || "", orderBy: props.orderBy || "relevance" } }),
    name: "getTextbooksQuery",
  }),
);

export default Container(connect(
  mapStateToProps,
)(HomeScreen));
