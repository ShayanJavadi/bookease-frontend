import { graphql } from "react-apollo";
import { connect } from "react-redux";
import * as actions from "./actions";
import queries from "./graphql/queries";
import PhoneScreen from "../PhoneScreen";

const { sendVerificationCodeMutation } = queries;

const mapStateToProps = ({ phoneValidationReducer }) => ({
  isPhoneValid: phoneValidationReducer.isPhoneValid,
  phoneNumber: phoneValidationReducer.phoneNumber,
});

const Container = graphql(sendVerificationCodeMutation, {
  options: props => ({ variables: { phoneNumber: props.phone || "" } }),
});

export default Container(connect(
  mapStateToProps,
  actions,
)(PhoneScreen));
