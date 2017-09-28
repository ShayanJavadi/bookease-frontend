import { forEach } from "lodash";
import {
  FORM_HAS_ERRORS,
} from "./consts";

export const createNewBook = (bookDetails) => async (dispatch) => {
  const errorsMessages = {
    bookTitle: "",
    bookAuthor: "",
    bookEdition: "",
    bookCondition: "",
    bookPrice: "",
    bookIsbn: "",
    bookDescription: "",
    formHasErrors: false,
  }

  forEach(bookDetails ,(bookDetail, key) => {
    const { value, humanizedValue } = bookDetail;
    if (!value) {
      errorsMessages.formHasErrors = true;
      errorsMessages[`${key}`] = `${humanizedValue} is required`;
    }
  })

  if (errorsMessages.formHasErrors) {
    return dispatch({ type: FORM_HAS_ERRORS, payload: errorsMessages })
  }

  // TODO: save to backend if everything is good
};
