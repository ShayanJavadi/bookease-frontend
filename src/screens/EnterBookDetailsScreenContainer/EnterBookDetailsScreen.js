import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { bindActionCreators } from "redux";
import mutations from "./graphql/mutations";
import queries from "./graphql/queries";
import actions from "./actions";
import EnterBookDetailsScreen from "../EnterBookDetailsScreen";

const { createTextbookMutation, deleteTextbookMutation } = mutations;
const { getTextbookQuery } = queries;
const { createNewBook, launchImageLibrary, deleteImage, resetState } = actions;

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
    resetState: resetState
  }, dispatch)
};
const Container = compose(
  graphql(createTextbookMutation, {
    options: props => ({ variables: { textbook: props.textbook || {} }, fetchPolicy: "network-only" }),
    name: "createTextbookMutation",
  }),
  graphql(getTextbookQuery, {
    options: props => ({ variables: { textbookId: props.textbookId || "" } }),
    name: "getTextbookQuery",
  }),
  graphql(deleteTextbookMutation, {
    options: props => ({ variables: { textbookId: props.textbookId || "" } }),
    name: "deleteTextbookMutation",
  }),
)

export default Container(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnterBookDetailsScreen));
