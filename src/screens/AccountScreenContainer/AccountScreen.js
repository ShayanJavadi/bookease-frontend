import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import * as actions from "./actions";
import AccountScreen from "../AccountScreen";
import { withNavigationFocus } from "react-navigation";
import signOutMutation from "./graphql/mutations/signOutMutation"
// move to another
const mapStateToProps = (state) => ({
    currentUser: state.Session.currentUser,
});

const Container = compose(
  graphql(signOutMutation, {
    name: "signOutMutation",
  }),
)

// pick out actions
export default Container(connect(mapStateToProps, actions)(withNavigationFocus(AccountScreen)));
