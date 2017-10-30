import { forEach } from "lodash";
import { FileSystem, ImagePicker } from "expo"
import {
  FORM_HAS_ERRORS,
  UPDATE_PHOTOS,
  PHOTO_GALLERY_OPEN,
  PHOTO_GALLERY_CLOSED,
} from "./consts";
import { BACKEND_AUTHENTICATION_HEADER } from "src/config.json";
import base64 from "base-64";


export const deletePhoto = (uri) => async (dispatch) => {
  FileSystem.deleteAsync(uri)
    .then(() => {
      dispatch(updatePhotos());
    })
}

export const updatePhotos = () => async (dispatch) => {
  FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}photos`)
    .then((files) => {
      const photos = [];
      files.map((file, index) => {
        photos.push({ uri: `${FileSystem.documentDirectory}photos/${file}`, key: index })
      })
      return dispatch({ type: UPDATE_PHOTOS, payload: photos });
    })
}

export const launchPhotoLibrary = () => async (dispatch) => {
  dispatch({ type: PHOTO_GALLERY_OPEN });

  let result = await ImagePicker.launchImageLibraryAsync({ base64: true });

  if (!result.cancelled) {
    return dispatch(addPhotoFromLibrary(result));
  }

  return dispatch({ type: PHOTO_GALLERY_CLOSED });
}

const addPhotoFromLibrary = (result) => (dispatch) => {
  FileSystem.moveAsync({
    from: result.uri,
    to: `${FileSystem.documentDirectory}photos/Photo_${Date.now()}.jpg`,
  })
    .then(() => {
      dispatch({ type: PHOTO_GALLERY_CLOSED });
      dispatch(updatePhotos());
    });
}

export const createNewBook = (bookDetails, createTextbookMutation) => async (dispatch) => {
  const formHasErrors = dispatch(checkForFormErrors(bookDetails));

  if (formHasErrors) {
    return;
  }

  const images = bookDetails.bookPhotos.value;

  dispatch(uploadImages(images, bookDetails, createTextbookMutation));
};

// TODO: handle loading
// TODO: better error handling
// TODO: navigate user to the single book screen with their newly created book

const uploadImages = (images, bookDetails, createTextbookMutation) => (dispatch) =>{
  const api = "https://bookease-development.herokuapp.com/upload";
  const matchImageDetails = /\/(Photo_(.*).(jpg))/;
  const imageUrls = [];

  images.reduce((previousPromises, image) => {
    return previousPromises.then(() => {
      const { uri, key } = image;
      const imageDetails = uri.match(matchImageDetails);
      const imageName = imageDetails[1];
      const imageType = imageDetails[3];
      const formData = new FormData();

      formData.append("image", {
        uri,
        name: imageName,
        type: `image/${imageType}`,
      });

      const options = {
        method: "POST",
        body: formData,
        headers: {
          Authorization:`Basic ${base64.encode(BACKEND_AUTHENTICATION_HEADER)}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };

      return fetch(api, options)
             .catch((e) => console.log(e)) // eslint-disable-line no-console
             .then((response) => response.json())
             .then((responseData) => {
               imageUrls.push({ thumbnail: responseData.url, priority: key });
             });
    })
  }, Promise.resolve()) // eslint-disable-line no-undef
    .then(() => {
      dispatch(saveBookToBackend(bookDetails, createTextbookMutation, imageUrls));
    });
}

const checkForFormErrors = (bookDetails) => (dispatch) => { // eslint-disable-line no-undef
  const errorsMessages = {
    bookPhotos: "",
    bookTitle: "",
    bookAuthor: "",
    bookEdition: "",
    bookCondition: "",
    bookPrice: "",
    bookIsbn: "",
    bookDescription: "",
    formHasErrors: false,
  };

  let formHasErrors = false;

  forEach(bookDetails , (bookDetail, key) => {
    const { value, humanizedValue } = bookDetail;

    if (!value) {
      errorsMessages.formHasErrors = true;
      errorsMessages[`${key}`] = `${humanizedValue} is required`;
    }
  });

  if (errorsMessages.formHasErrors) {
     dispatch({ type: FORM_HAS_ERRORS, payload: errorsMessages });
     formHasErrors = true;
  }

  return formHasErrors;
}

const saveBookToBackend = (bookDetails, createTextbookMutation, imageUrls) => (dispatch) => { // eslint-disable-line no-unused-vars
  const {
    bookTitle,
    bookAuthor,
    bookEdition,
    bookPrice,
    bookIsbn,
    bookDescription,
    bookCondition
  } = bookDetails;

  const textbookToSave = {
    title: bookTitle.value,
    description: bookDescription.value,
    industryIdentifiers: {
      type: "ISBN-13",
      identifier: bookIsbn.value,
    },
    authors: [bookAuthor.value],
    edition: bookEdition.value,
    images: imageUrls,
    condition: bookCondition.value,
    price: bookPrice.value,
  };

  createTextbookMutation({
    variables: {
      textbook: textbookToSave
    }
  })
  // .catch((e) => console.log(e))
  // .then((response) => {
  //   console.log(response);
  // });
  // TODO: delete image folder here
  return;
}
