import {
  FORM_HAS_ERRORS,
  UPDATE_IMAGES,
  IMAGE_GALLERY_OPEN,
  IMAGE_GALLERY_CLOSED,
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
      return { ...state, errorsMessages: action.payload };
    default:
      return state;
  }
};
