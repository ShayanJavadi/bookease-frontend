import { graphql } from "react-apollo";
import { connect } from "react-redux";
import actions from "./actions";
import setFullNameMutation from "./graphql/queries/setFullNameMutation";
import ChangeFullNameScreen from "../ChangeFullNameScreen";

const mapStateToProps = ({ Session }) => ({
  currentUser: Session.currentUser,
  nextScreen: "schoolSelectionScreen",
});

const Container = graphql(setFullNameMutation, {
  options: props => ({ variables: { email: props.email || "", phoneNumber: props.phoneNumber || "", fullName: props.fullName || "" } }),
});

export default Container(connect(
  mapStateToProps,
  actions,
)(ChangeFullNameScreen));
