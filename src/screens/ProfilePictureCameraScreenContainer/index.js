import { connect } from "react-redux";
import * as actions from "./actions";
import ProfilePictureCameraScreen from "../ProfilePictureCameraScreen";

const mapStateToProps = ({ ProfilePictureCameraReducer }) => ({
  image: ProfilePictureCameraReducer.image,
  isTakingPicture: ProfilePictureCameraReducer.isTakingPicture,
});

export default connect(
  mapStateToProps,
  actions,
)(ProfilePictureCameraScreen);
