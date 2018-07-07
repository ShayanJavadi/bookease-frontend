import { graphql } from "react-apollo";
import { connect } from "react-redux";
import actions from "./actions";
import setPhotoUrlMutation from "./graphql/queries/setPhotoUrlMutation";
import ProfilePictureImageScreen from "../ProfilePictureImageScreen";

const mapStateToProps = ({ Session, ProfilePictureImageReducer }) => ({
  currentStoredUser: Session.currentStoredUser,
  isImageGalleryOpen: ProfilePictureImageReducer.isImageGalleryOpen,
  isUploading: ProfilePictureImageReducer.isUploading,
});

const Container = graphql(setPhotoUrlMutation, {
  options: props => ({ variables: { phoneNumber: props.currentStoredUser ? props.currentStoredUser.phoneNumber : "", photoUrl: props.photoUrl || "" } }),
});

export default Container(connect(
  mapStateToProps,
  actions,
)(ProfilePictureImageScreen));
