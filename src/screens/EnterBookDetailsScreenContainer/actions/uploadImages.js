import extractImageDetails from "./extractImageDetails";
import uploadImage from "./uploadImage";
import {
  UPDATE_LOADING_MESSAGE,
} from "./consts";

const uploadImages = (images, dispatch) => {
  dispatch({ type: UPDATE_LOADING_MESSAGE, payload: "Uploading your images..." });

  const imageUrls = [];

  return images.reduce((previousPromises, image) => {
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
      return imageUrls;
    });
}

export default uploadImages;
