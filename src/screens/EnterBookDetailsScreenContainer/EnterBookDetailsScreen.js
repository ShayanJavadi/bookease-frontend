import { connect } from "react-redux";
import * as actions from "./actions";
import EnterBookDetailsScreen from "../EnterBookDetailsScreen";

const mapStateToProps = ({ EnterBookDetailsReducer }) => ({
  errorsMessages: EnterBookDetailsReducer.errorsMessages,
  photos: EnterBookDetailsReducer.photos,
  photoGalleryOpen: EnterBookDetailsReducer.photoGalleryOpen,
});

export default connect(
  mapStateToProps,
  actions,
)(EnterBookDetailsScreen);
