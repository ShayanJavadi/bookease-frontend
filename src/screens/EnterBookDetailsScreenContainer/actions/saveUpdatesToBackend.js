import {
  UPDATE_LOADING_MESSAGE,
  SUBMIT_FORM_RS,
  RESET_STATE,
} from "./consts";

const saveBookToBackend = (bookDetails, updateTextbookMutation, imageUrls, textbookId, dispatch) => {
  dispatch({ type: UPDATE_LOADING_MESSAGE, payload: "Updating your listing..." });

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
    id: textbookId,
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


  updateTextbookMutation({
    variables: {
      textbook: textbookToSave
    }
  })
  .then((response) => {
    dispatch({ type: UPDATE_LOADING_MESSAGE, payload: "Done." });
    dispatch({
       type: SUBMIT_FORM_RS,
       payload: { submittedBook: response.data.updateTextbook.id, submissionType: "updateTextbook" }
    });
    dispatch({ type: RESET_STATE });
  })

  // TODO: delete image folder here
  return;
}

export default saveBookToBackend;
