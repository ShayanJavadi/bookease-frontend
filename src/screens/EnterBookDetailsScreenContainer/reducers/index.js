import {
  FORM_HAS_ERRORS,
} from "../actions/consts";

const INITIAL_STATE = {
  errorsMessages: {
    bookTitle: "",
    bookAuthor: "",
    bookEdition: "",
    bookCondition: "",
    bookPrice: "",
    bookIsbn: "",
    bookDescription: "",
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORM_HAS_ERRORS:
      return {
        errorsMessages: action.payload,
      };
    default:
      return state;
  }
};
