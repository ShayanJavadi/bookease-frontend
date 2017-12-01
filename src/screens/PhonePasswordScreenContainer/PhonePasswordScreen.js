import { graphql } from "react-apollo";
import { connect } from "react-redux";
import * as actions from "./actions";
import signInWithPhoneNumberMutation from "./graphql/queries/signInWithPhoneNumberMutation";
import PasswordScreen from "../PasswordScreen";

const mapStateToProps = ({ phonePasswordValidationReducer }) => ({
  isPasswordValid: phonePasswordValidationReducer.isPasswordValid,
  updateCounter: phonePasswordValidationReducer.updateCounter,
  nextScreen: "homeScreen",
});

const Container = graphql(signInWithPhoneNumberMutation, {
  options: props => ({ variables: { phoneNumber: props.identifier || "", password: props.password || "" } }),
});

export default Container(connect(
  mapStateToProps,
  actions,
)(PasswordScreen));
