import checkForFormErrors from "./checkForFormErrors";
import uploadImages from "./uploadImages";
import saveUpdatesToBackend from "./saveUpdatesToBackend";
import {
  SUBMIT_FORM_RQ,
  UPDATE_LOADING_MESSAGE,
} from "./consts";
const updateTextbook = (bookDetails, uploadedImages, updateTextbookMutation, textbookId) => async (dispatch) => {
  const formHasErrors = checkForFormErrors(bookDetails, dispatch);
  if (formHasErrors) {
    return;
  }

  dispatch({ type: SUBMIT_FORM_RQ });
  dispatch({ type: UPDATE_LOADING_MESSAGE, payload: "Gathering information..." });

  // seperate uploaded images from images
  const images = bookDetails.bookImages.value.reduce((imagesToUpload, image) => {
    if (image.uri) {
      imagesToUpload.push(image);
    }

    return imagesToUpload;
  }, []);

  const oldImages = bookDetails.bookImages.value.reduce((previouslyUploadedImages, image) => {
    if (image.thumbnail) {
      previouslyUploadedImages.push(image);
    }

    return previouslyUploadedImages;
  }, []);

  console.log('images');
  console.log(images);
  uploadImages(images, dispatch)
  .then((newImages) => {
    const updatedImages = [...oldImages, ...newImages].reduce((reprioritizedImages, image, currentIndex) => {
      const prioritizedImage = {
        thumbnail: image.thumbnail,
        priority: currentIndex,
      }

      reprioritizedImages.push(prioritizedImage);
      return reprioritizedImages;
    }, [])

    return saveUpdatesToBackend(bookDetails, updateTextbookMutation, updatedImages, textbookId, dispatch);
  })
};

export default updateTextbook;
