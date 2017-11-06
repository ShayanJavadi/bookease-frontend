import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { bindActionCreators } from "redux";
import mutations from "./graphql/mutations";
import actions from "./actions";
import EnterBookDetailsScreen from "../EnterBookDetailsScreen";

const { createTextbookMutation } = mutations;
const { createNewBook, launchImageLibrary, deleteImage } = actions;

const mapStateToProps = ({ EnterBookDetailsReducer }) => ({
  errorsMessages: EnterBookDetailsReducer.errorsMessages,
  images: EnterBookDetailsReducer.images,
  imageGalleryOpen: EnterBookDetailsReducer.imageGalleryOpen,
  isSubmitting: EnterBookDetailsReducer.isSubmitting,
  loadingMessage: EnterBookDetailsReducer.loadingMessage,
  submittedBook: EnterBookDetailsReducer.submittedBook,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createNewBook: createNewBook,
    launchImageLibrary: launchImageLibrary,
    deleteImage: deleteImage,
  }, dispatch)
};

const Container = graphql(createTextbookMutation, {
  options: props => ({ variables: { textbook: props.textbook || {} } }),
});


export default Container(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnterBookDetailsScreen));
