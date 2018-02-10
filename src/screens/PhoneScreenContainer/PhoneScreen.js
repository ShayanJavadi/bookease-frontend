import { graphql } from "react-apollo";
import { connect } from "react-redux";
import queries from "./graphql/queries";
import PhoneScreen from "../PhoneScreen";

const { sendVerificationCodeMutation } = queries;

const mapStateToProps = ( ) => ({ });

const Container = graphql(sendVerificationCodeMutation, {
  options: props => ({ variables: { phoneNumber: props.phone || "" } }),
});

export default Container(connect(
  mapStateToProps,
  { },
)(PhoneScreen));
