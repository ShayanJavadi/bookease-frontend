import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import actions from "./actions";
import queries from "./graphql/queries";
import mutations from "./graphql/mutations";
import EnterPasswordScreen from "../EnterPasswordScreen";

const { getSessionQuery, getSchoolNameQuery } = queries;
const { updateProfileMutation, signInWithPhoneNumberMutation } = mutations;

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
  graphql(updateProfileMutation, {
    name: "updateProfileMutation",
    options: props => ({ variables: { pushNotificationToken: props.pushNotificationToken || "" } }),
  }),
  graphql(signInWithPhoneNumberMutation, {
    name: "signInWithPhoneNumberMutation",
    options: props => ({ variables: { phoneNumber: props.identifier || "", password: props.password || "" } }),
  }),

);

export default Container(connect(
  mapStateToProps,
  actions,
)(EnterPasswordScreen));
