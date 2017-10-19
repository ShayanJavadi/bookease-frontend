import { graphql } from "react-apollo";
import { connect } from "react-redux";
import * as actions from "./actions";
import queries from "./graphql/queries";
import PasswordScreen from "../PasswordScreen";

const { signInWithPhoneNumberMutation } = queries;

const mapStateToProps = ({ phonePasswordValidationReducer }) => ({
  isPasswordValid: phonePasswordValidationReducer.isPasswordValid,
  updateCounter: phonePasswordValidationReducer.updateCounter,
  nextScreen: "fullNameScreen",
});

const Container = graphql(signInWithPhoneNumberMutation, {
  options: props => ({ variables: { phoneNumber: props.identifier || "", password: props.password || "" } }),
});

export default Container(connect(
  mapStateToProps,
  actions,
)(PasswordScreen));
