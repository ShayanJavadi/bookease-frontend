import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import queries from "./graphql/queries";
import mutations from "./graphql/mutations";
import { withNavigationFocus } from "react-navigation-is-focused-hoc"
import MyBooksListingsScreen from "../MyBooksListingsScreen";

const { getMyTextbooksQuery } = queries;
const { deleteTextbookMutation } = mutations;
const mapStateToProps = (state) => ({
    isAuthenticated: state.Session.isAuthenticated
});

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
)(withNavigationFocus(MyBooksListingsScreen)));
