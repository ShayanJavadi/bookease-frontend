import {
  IMAGE_GALLERY_OPEN,
  IMAGE_GALLERY_CLOSED,
  IS_UPLOADING,
} from "../actions/consts";

const INITIAL_STATE = {
  isImageGalleryOpen: true,
  isUploading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IMAGE_GALLERY_OPEN:
      return { ...state, isImageGalleryOpen: true };
    case IMAGE_GALLERY_CLOSED:
      return { ...state, isImageGalleryOpen: false, isUploading: false };
    case IS_UPLOADING:
      return { ...state, isUploading: true };
    default:
      return state;
  }
};
