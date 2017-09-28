import { forEach, isEmpty } from "lodash";
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
  }

  forEach(bookDetails ,(bookDetail, key) => {
    const { value, humanizedValue } = bookDetail;
    if (!value) {
      errorsMessages[`${key}`] = `${humanizedValue} is required`;
    }
  })
  console.log(errorsMessages);
  if (!isEmpty(errorsMessages)) {
    return dispatch({ type: FORM_HAS_ERRORS, payload: errorsMessages })
  }
};
