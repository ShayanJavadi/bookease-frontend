import checkForFormErrors from "./checkForFormErrors";
import uploadImages from "./uploadImages";
import {
  SUBMIT_FORM_RQ,
  UPDATE_LOADING_MESSAGE,
} from "./consts";
const createNewBook = (bookDetails, createTextbookMutation) => async (dispatch) => {
  const formHasErrors = checkForFormErrors(bookDetails, dispatch);
  if (formHasErrors) {
    return;
  }

  dispatch({ type: SUBMIT_FORM_RQ });
  dispatch({ type: UPDATE_LOADING_MESSAGE, payload: "Gathering information..." });

  const images = bookDetails.bookImages.value;

  return uploadImages(images, bookDetails, createTextbookMutation, dispatch);
};

export default createNewBook;
