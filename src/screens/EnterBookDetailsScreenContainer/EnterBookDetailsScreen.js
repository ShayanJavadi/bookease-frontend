import { connect } from "react-redux";
import { graphql } from "react-apollo";
import mutations from "./graphql/mutations";
import * as actions from "./actions";
import EnterBookDetailsScreen from "../EnterBookDetailsScreen";

const { createTextbookMutation } = mutations;

const mapStateToProps = ({ EnterBookDetailsReducer }) => ({
  errorsMessages: EnterBookDetailsReducer.errorsMessages,
  photos: EnterBookDetailsReducer.photos,
  photoGalleryOpen: EnterBookDetailsReducer.photoGalleryOpen,
});

const Container = graphql(createTextbookMutation, {
  options: props => ({ variables: { textbook: props.textbook || {} } }),
});


export default Container(connect(
  mapStateToProps,
  actions,
)(EnterBookDetailsScreen));
