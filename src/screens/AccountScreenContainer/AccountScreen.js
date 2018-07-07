import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import AccountScreen from "../AccountScreen";
import { withNavigationFocus } from "react-navigation";
import signOutMutation from "./graphql/mutations/signOutMutation"


const mapStateToProps = (state) => ({
    currentStoredUser: state.Session.currentStoredUser,
});

const Container = compose(
  graphql(signOutMutation, {
    name: "signOutMutation",
  }),
)

// pick out actions
export default Container(connect(mapStateToProps, undefined)(withNavigationFocus(AccountScreen)));
