import { isEmpty, isNumber, reduce } from "lodash";
import { isISBN } from "validator";
import { FORM_HAS_ERRORS } from "./consts";

const checkForFormErrors = (bookDetails, dispatch) => { // eslint-disable-line no-undef
  const errorsMessages = {
    formHasErrors: false,
  };

  reduce(bookDetails, (errors, bookDetail, key) => {
    const { value, humanizedValue } = bookDetail;
    if (!value && !isNumber(value)) {
      errorsMessages.formHasErrors = true;
      errorsMessages[`${key}`] = `${humanizedValue} is required`;
    }

    if (key === "bookImages" && isEmpty(value)) {
      errorsMessages[`${key}`] = "Book pictures are required";
      errorsMessages.formHasErrors = true;
    }

    if (key === "bookIsbn" && value) {
      if (!isISBN(value)) {
        errorsMessages[`${key}`] = "Invalid ISBN number";
        errorsMessages.formHasErrors = true;
      }
    }
  }, errorsMessages);

  if (errorsMessages.formHasErrors) {
     dispatch({ type: FORM_HAS_ERRORS, payload: errorsMessages });
  }

  return errorsMessages.formHasErrors;
}

export default checkForFormErrors;
