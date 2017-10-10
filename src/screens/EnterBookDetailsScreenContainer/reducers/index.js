import {
  FORM_HAS_ERRORS,
  UPDATE_PHOTOS,
  PHOTO_GALLERY_OPEN,
  PHOTO_GALLERY_CLOSED,
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
  photoGalleryOpen: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PHOTO_GALLERY_OPEN:
      return { ...state, photoGalleryOpen: true }
    case PHOTO_GALLERY_CLOSED:
      return { ...state, photoGalleryOpen: false }
    case UPDATE_PHOTOS:
      return { ...state, photos: action.payload, loading: false }
    case FORM_HAS_ERRORS:
      return { ...state, errorsMessages: action.payload };
    default:
      return state;
  }
};
