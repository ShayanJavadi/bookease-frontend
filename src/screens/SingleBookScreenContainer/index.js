import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
// import * as actions from "./actions";
import queries from "./graphql/queries";
import SingleBookScreen from "../SingleBookScreen";

const { getTextbookQuery } = queries;

const mapStateToProps = ({ MyBooksListingsReducer }) => ({}); // eslint-disable-line no-unused-vars

const Container = compose(
  graphql(getTextbookQuery, {
    options: props => ({ variables: { textbookId: props.textbookId || "" } }),
    name: "getTextbookQuery"
  })
)

export default Container(connect(
  mapStateToProps,
)(SingleBookScreen));
