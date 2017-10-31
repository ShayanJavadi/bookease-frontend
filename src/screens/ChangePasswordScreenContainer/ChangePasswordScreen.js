import { graphql } from "react-apollo";
import { connect } from "react-redux";
import * as actions from "./actions";
import queries from "./graphql/queries";
import PasswordScreen from "../PasswordScreen";

const { changePasswordMutation } = queries;

const mapStateToProps = ({ changePasswordValidationReducer }) => ({
  isPasswordValid: changePasswordValidationReducer.isPasswordValid,
  updateCounter: changePasswordValidationReducer.updateCounter,
  nextScreen: "changeFullNameScreen",
  message: "Choose a password"
});

const Container = graphql(changePasswordMutation, {
  options: props => ({ variables: { email: props.email || "", phone: props.phone || "", password: props.password || "" } }),
});

export default Container(connect(
  mapStateToProps,
  actions,
)(PasswordScreen));
