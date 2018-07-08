import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import actions from "./actions";
import signOutMutation from "./graphql/mutations/signOutMutation";
import setPhotoUrlMutation from "./graphql/mutations/setPhotoUrlMutation";
import AccountScreen from "../AccountScreen";

const mapStateToProps = ({ Session }) => ({
  currentStoredUser: Session.currentStoredUser,
});

const Container = compose(
  graphql(setPhotoUrlMutation, {
    options: props => ({ variables: { phoneNumber: props.currentStoredUser ? props.currentStoredUser.phoneNumber : "", photoUrl: props.photoUrl || "" } }),
  }),
  graphql(signOutMutation, {
    name: "signOutMutation",
  })
);

export default Container(connect(
  mapStateToProps,
  actions,
)(AccountScreen));
