import { graphql } from "react-apollo";
import { connect } from "react-redux";
import * as actions from "./actions";
import queries from "./graphql/queries";
import PinScreen from "../PinScreen";

const { validatePinMutation } = queries;

const mapStateToProps = ({ phonePinValidationReducer }) => ({
  isPinValid: phonePinValidationReducer.isPinValid,
  profileData: phonePinValidationReducer.profileData,
  updateCounter: phonePinValidationReducer.updateCounter,
});

const Container = graphql(validatePinMutation, {
  options: props => ({ variables: { phoneNumber: props.identifier || "", verificationCode: props.verificationCode || "" } }),
});

export default Container(connect(
  mapStateToProps,
  actions,
)(PinScreen));
