import { graphql } from "react-apollo";
import { connect } from "react-redux";
import actions from "./actions";
import changePasswordMutation from "./graphql/queries/changePasswordMutation";
import ChangePasswordScreen from "../ChangePasswordScreen";

const mapStateToProps = ({ changePasswordSubmitReducer }) => ({
  isPasswordValid: changePasswordSubmitReducer.isPasswordValid,
  updateCounter: changePasswordSubmitReducer.updateCounter,
});

const Container = graphql(changePasswordMutation, {
  options: props => ({ variables: { email: props.email || "", phoneNumber: props.phoneNumber || "", password: props.password || "" } }),
});

export default Container(connect(
  mapStateToProps,
  actions,
)(ChangePasswordScreen));
