import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import * as actions from "./actions";
import queries from "./graphql/queries";
import PinScreen from "../PinScreen";

const { signInWithEmailMutation, validatePinMutation } = queries;

const mapStateToProps = ({ emailPinValidationReducer }) => ({
  isPinValid: emailPinValidationReducer.isPinValid,
  profileData: emailPinValidationReducer.profileData,
  updateCounter: emailPinValidationReducer.updateCounter,
  nextScreen: "changePasswordScreen",
});

const Container = graphql(validatePinMutation, {
  options: props => ({ variables: { email: props.email || "", verificationCode: props.verificationCode || "" } }),
});

export default Container(connect(
  mapStateToProps,
  actions,
)(PinScreen));
