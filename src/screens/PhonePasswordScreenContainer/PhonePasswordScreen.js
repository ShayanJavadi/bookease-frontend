import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import actions from "./actions";
import queries from "./graphql/queries";
import PasswordScreen from "../PasswordScreen";

const { getSessionQuery, signInWithPhoneNumberMutation } = queries;

const mapStateToProps = ({ phonePasswordValidationReducer }) => ({
  isPasswordValid: phonePasswordValidationReducer.isPasswordValid,
  updateCounter: phonePasswordValidationReducer.updateCounter,
  nextScreen: "homeScreen",
});

const Container = compose(
  graphql(getSessionQuery, {
    
  }),
  graphql(signInWithPhoneNumberMutation, {
    options: props => ({ variables: { phoneNumber: props.identifier || "", password: props.password || "" } }),
  })
);

export default Container(connect(
  mapStateToProps,
  actions,
)(PasswordScreen));
