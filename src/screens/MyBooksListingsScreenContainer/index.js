import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import queries from "./graphql/queries";
import mutations from "./graphql/mutations";
import { withNavigationFocus } from "react-navigation"
import MyBooksListingsScreen from "../MyBooksListingsScreen";

const { getMyTextbooksQuery } = queries;
const { deleteTextbookMutation } = mutations;
const mapStateToProps = (state) => ({
    currentUser: state.Session.currentUser,
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
