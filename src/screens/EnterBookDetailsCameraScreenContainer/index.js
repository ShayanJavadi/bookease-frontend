import { connect } from "react-redux";
import * as actions from "./actions";
import EnterBookDetailsCameraScreen from "../EnterBookDetailsCameraScreen";

const mapStateToProps = ({ EnterBookDetailsCameraReducer }) => ({
  images: EnterBookDetailsCameraReducer.images,
});

export default connect(
  mapStateToProps,
  actions,
)(EnterBookDetailsCameraScreen);
