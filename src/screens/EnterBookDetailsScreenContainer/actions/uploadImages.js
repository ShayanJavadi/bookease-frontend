import extractImageDetails from "./extractImageDetails";
import uploadImage from "./uploadImage";
import saveBookToBackend from "./saveBookToBackend";
import {
  UPDATE_LOADING_MESSAGE,
} from "./consts";

const uploadImages = (images, bookDetails, createTextbookMutation, dispatch) => {
  dispatch({ type: UPDATE_LOADING_MESSAGE, payload: "Uploading your images..." });

  const imageUrls = [];

  images.reduce((previousPromises, image) => {
    return previousPromises.then(() => {
      const { imageName, imageType } = extractImageDetails(image);

      return uploadImage(image.uri, imageName, imageType)
             .catch((e) => console.log(e)) // eslint-disable-line no-console
             .then((response) => response.json())
             .then((responseData) => {
               imageUrls.push({ thumbnail: responseData.url, priority: image.key });
             });
    })
  }, Promise.resolve()) // eslint-disable-line no-undef
    .then(() => {
      return saveBookToBackend(bookDetails, createTextbookMutation, imageUrls, dispatch);
    });
}

export default uploadImages;
