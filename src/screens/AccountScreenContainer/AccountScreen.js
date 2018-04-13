import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import actions from "./actions";
import AccountScreen from "../AccountScreen";
import { withNavigationFocus } from "react-navigation";
import signOutMutation from "./graphql/mutations/signOutMutation"


const mapStateToProps = (state) => ({
    currentUser: state.Session.currentUser,
});

const Container = compose(
  graphql(signOutMutation, {
    name: "signOutMutation",
  }),
)

export default Container(connect(mapStateToProps, actions)(withNavigationFocus(AccountScreen)));
