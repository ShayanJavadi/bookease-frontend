import { graphql } from "react-apollo";
import { connect } from "react-redux";
import * as actions from "./actions";
import signInWithEmailMutation from "./graphql/queries/signInWithEmailMutation";
import PasswordScreen from "../PasswordScreen";

const mapStateToProps = ({ emailPasswordValidationReducer }) => ({
  isPasswordValid: emailPasswordValidationReducer.isPasswordValid,
  updateCounter: emailPasswordValidationReducer.updateCounter,
  nextScreen: "homeScreen",
});

const Container = graphql(signInWithEmailMutation, {
  options: props => ({ variables: { email: props.identifier || "", password: props.password || "" } }),
});

export default Container(connect(
  mapStateToProps,
  actions,
)(PasswordScreen));
