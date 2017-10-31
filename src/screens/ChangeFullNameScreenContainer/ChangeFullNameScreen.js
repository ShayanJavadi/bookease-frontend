import { graphql } from "react-apollo";
import { connect } from "react-redux";
import * as actions from "./actions";
import queries from "./graphql/queries";
import ChangeFullNameScreen from "../ChangeFullNameScreen";

const { setFullNameMutation } = queries;

const mapStateToProps = ({ fullNameValidationReducer }) => ({
  isFullNameValid: fullNameValidationReducer.isFullNameValid,
  updateCounter: fullNameValidationReducer.updateCounter,
  nextScreen: "schoolSelectionScreen",
});

const Container = graphql(setFullNameMutation, {
  options: props => ({ variables: { email: props.email || "", phone: props.phone || "", fullName: props.fullName || "" } }),
});

export default Container(connect(
  mapStateToProps,
  actions,
)(ChangeFullNameScreen));
