import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import actions from "./actions";
import queries from "./graphql/queries";
import EnterPasswordScreen from "../EnterPasswordScreen";

const { getSessionQuery, getSchoolNameQuery, signInWithPhoneNumberMutation } = queries;

const mapStateToProps = ({ phonePasswordValidationReducer }) => ({
  isPasswordValid: phonePasswordValidationReducer.isPasswordValid,
  updateCounter: phonePasswordValidationReducer.updateCounter,
});

const Container = compose(
  graphql(getSessionQuery, {
    name: "getSessionQuery",
  }),
  graphql(getSchoolNameQuery, {
    name: "getSchoolNameQuery",
    options: () => ({ variables: { schoolId: "000000" } }),
  }),
  graphql(signInWithPhoneNumberMutation, {
    options: props => ({ variables: { phoneNumber: props.identifier || "", password: props.password || "" } }),
  })
);

export default Container(connect(
  mapStateToProps,
  actions,
)(EnterPasswordScreen));
