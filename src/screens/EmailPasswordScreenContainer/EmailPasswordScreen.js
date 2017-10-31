import { graphql } from "react-apollo";
import { connect } from "react-redux";
import * as actions from "./actions";
import queries from "./graphql/queries";
import PasswordScreen from "../PasswordScreen";

const { signInWithEmailMutation } = queries;

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
