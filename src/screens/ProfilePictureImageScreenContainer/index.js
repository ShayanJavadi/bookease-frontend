import { connect } from "react-redux";
import actions from "./actions";
import ProfilePictureImageScreen from "../ProfilePictureImageScreen";

const mapStateToProps = ({ Session, ProfilePictureImageReducer }) => ({
  currentUser: Session.currentUser,
  isImageGalleryOpen: ProfilePictureImageReducer.isImageGalleryOpen,
});

export default connect(
  mapStateToProps,
  actions,
)(ProfilePictureImageScreen);
