import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import queries from "./graphql/queries";
import mutations from "./graphql/mutations";
import MyBooksListingsScreen from "../MyBooksListingsScreen";

const { getMyTextbooksQuery } = queries;
const { deleteTextbookMutation } = mutations;
const mapStateToProps = ({ MyBooksListingsReducer }) => ({}); // eslint-disable-line no-unused-vars

const Container = compose(
  graphql(getMyTextbooksQuery, {
    name: "getMyTextbooksQuery",
  }),
  graphql(deleteTextbookMutation, {
    options: props => ({ variables: { textbookId: props.textbookId || "" } }),
    name: "deleteTextbookMutation",
  }),
);

export default Container(connect(
  mapStateToProps,
)(MyBooksListingsScreen));
