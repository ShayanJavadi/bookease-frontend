import {
  UPDATE_LOADING_MESSAGE,
  SUBMIT_FORM_RS,
  RESET_STATE,
} from "./consts";

const saveBookToBackend = (bookDetails, createTextbookMutation, imageUrls, dispatch) => {
  dispatch({ type: UPDATE_LOADING_MESSAGE, payload: "Submitting your listing..." });

  const {
    bookTitle,
    bookAuthor,
    bookEdition,
    bookPrice,
    bookIsbn,
    bookDescription,
    bookCondition
  } = bookDetails;

  const textbookToSave = {
    title: bookTitle.value,
    description: bookDescription.value,
    industryIdentifiers: {
      type: "ISBN-13",
      identifier: bookIsbn.value,
    },
    authors: [bookAuthor.value],
    edition: bookEdition.value,
    images: imageUrls,
    condition: bookCondition.value,
    price: bookPrice.value,
  };

  createTextbookMutation({
    variables: {
      textbook: textbookToSave
    }
  })
  .catch((e) => console.warn(e))
  .then((response) => {
    console.log(response);
    dispatch({ type: UPDATE_LOADING_MESSAGE, payload: "Done." });
    dispatch({ type: SUBMIT_FORM_RS, payload: response.data.createTextbook });
    dispatch({ type: RESET_STATE });
  })
  // .catch((e) => console.log(e))
  // .then((response) => {
  //   console.log(response);
  // });
  // TODO: delete image folder here
  return;
}

export default saveBookToBackend;
