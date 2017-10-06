import {
  FORM_HAS_ERRORS,
  UPDATE_PHOTOS,
  FORM_RQ,
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
    loading: false,
  },
  photos: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORM_RQ:
      return { ...state, loading: true };
    case UPDATE_PHOTOS:
    console.log('actually works');
      console.log(action.payload);
      console.log({ ...state, photos: action.payload, loading: false});
      return { ...state, photos: action.payload, loading: false}
    case FORM_HAS_ERRORS:
      return { errorsMessages: action.payload };
    default:
      return state;
  }
};
