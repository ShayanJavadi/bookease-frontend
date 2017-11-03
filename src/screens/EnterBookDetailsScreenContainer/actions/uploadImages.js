import extractImageDetails from "./extractImageDetails";
import uploadImage from "./uploadImage";
import saveBookToBackend from "./saveBookToBackend";

const uploadImages = (images, bookDetails, createTextbookMutation) => {
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
      return saveBookToBackend(bookDetails, createTextbookMutation, imageUrls);
    });
}

export default uploadImages;
