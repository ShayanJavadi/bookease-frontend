import {
  FORM_HAS_ERRORS,
  UPDATE_IMAGES,
  IMAGE_GALLERY_OPEN,
  IMAGE_GALLERY_CLOSED,
  SUBMIT_FORM_RQ,
  UPDATE_LOADING_MESSAGE,
  SUBMIT_FORM_RS,
  RESET_STATE,
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
  images: [],
  imageGalleryOpen: false,
  isSubmitting: false,
  loadingMessage: "",
  submittedBook: undefined,
  submissionType: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IMAGE_GALLERY_OPEN:
      return { ...state, imageGalleryOpen: true }
    case IMAGE_GALLERY_CLOSED:
      return { ...state, imageGalleryOpen: false }
    case UPDATE_IMAGES:
      return { ...state, images: action.payload, loading: false }
    case FORM_HAS_ERRORS:
      return { ...state, errorsMessages: action.payload }
    case SUBMIT_FORM_RQ:
      return { ...state, isSubmitting: true }
    case UPDATE_LOADING_MESSAGE:
      return { ...state, loadingMessage: action.payload }
    case SUBMIT_FORM_RS:
      return { ...state, isSubmitting: false, submittedBook: action.payload.submittedBook, submissionType: action.payload.submissionType }
    case RESET_STATE:
      return INITIAL_STATE
    default:
      return state;
  }
};
