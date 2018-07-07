import { graphql } from "react-apollo";
import { connect } from "react-redux";
import actions from "./actions";
import setPhotoUrlMutation from "./graphql/queries/setPhotoUrlMutation";
import ProfilePictureCameraScreen from "../ProfilePictureCameraScreen";

const mapStateToProps = ({ Session, ProfilePictureCameraReducer }) => ({
  currentStoredUser: Session.currentStoredUser,
  imageUri: ProfilePictureCameraReducer.imageUri,
  isTakingPicture: ProfilePictureCameraReducer.isTakingPicture,
});

const Container = graphql(setPhotoUrlMutation, {
  options: props => ({ variables: { phoneNumber: props.currentStoredUser ? props.currentStoredUser.phoneNumber : "", photoUrl: props.photoUrl || "" } }),
});

export default Container(connect(
  mapStateToProps,
  actions,
)(ProfilePictureCameraScreen));
