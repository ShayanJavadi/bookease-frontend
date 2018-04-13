import {
  IMAGE_GALLERY_OPEN,
  IMAGE_GALLERY_CLOSED,
} from "../actions/consts";

const INITIAL_STATE = {
  isImageGalleryOpen: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IMAGE_GALLERY_OPEN:
      return { ...state, isImageGalleryOpen: true }
    case IMAGE_GALLERY_CLOSED:
      return { ...state, isImageGalleryOpen: false }
    default:
      return state;
  }
};
