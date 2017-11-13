import { graphql } from "react-apollo";
import { connect } from "react-redux";
import actions from "./actions";
import changePasswordMutation from "./graphql/queries/changePasswordMutation";
import PasswordScreen from "../PasswordScreen";

const mapStateToProps = ({ changePasswordSubmitReducer }) => ({
  isPasswordValid: changePasswordSubmitReducer.isPasswordValid,
  updateCounter: changePasswordSubmitReducer.updateCounter,
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
