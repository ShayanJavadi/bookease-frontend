import { graphql } from "react-apollo";
import { connect } from "react-redux";
import * as actions from "./actions";
import queries from "./graphql/queries";
import EmailScreen from "../EmailScreen";

const { sendVerificationCodeMutation } = queries;

const mapStateToProps = ({ emailValidationReducer }) => ({ isEmailValid: emailValidationReducer.isEmailValid });

const Container = graphql(sendVerificationCodeMutation, {
  options: props => ({ variables: { email: props.email || "" } }),
});

export default Container(connect(
  mapStateToProps,
  actions,
)(EmailScreen));
