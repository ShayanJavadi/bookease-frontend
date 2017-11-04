import checkForFormErrors from "./checkForFormErrors";
import uploadImages from "./uploadImages";

const createNewBook = (bookDetails, createTextbookMutation) => async (dispatch) => {
  const formHasErrors = checkForFormErrors(bookDetails, dispatch);
  if (formHasErrors) {
    return;
  }

  const images = bookDetails.bookImages.value;

  return uploadImages(images, bookDetails, createTextbookMutation);
};

export default createNewBook;
