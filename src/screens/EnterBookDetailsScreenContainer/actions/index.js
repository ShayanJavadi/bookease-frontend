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
  console.log('updating photos');
  FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}photos`)
    .then((files) => {
      const photos = [];
      files.map((file, index) => {
        console.log(file);
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

  if (!formHasErrors) {
    return;
  }

  const uploadImages = (images) => {
    const api = "https://bookease-development.herokuapp.com/upload";
    const matchImageDetails = /\/(Photo_(.*).(jpg))/;

    return imageUploadPromises = images.reduce((previousPromises, image) => {
      return previousPromises.then(() => {
        const uri = image.uri;
        const imageDetails = uri.match(matchImageDetails);
        const imageName = imageDetails[1];
        const imageType = imageDetails[3];
        const formData = new FormData();

        formData.append('image', {
          uri,
          name: imageName,
          type: `image/${imageType}`,
        });

        const options = {
          method: 'POST',
          body: formData,
          headers: {
            Authorization:`Basic ${base64.encode(BACKEND_AUTHENTICATION_HEADER)}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        };
        console.log(formData);
        return fetch(api, options)
                 .catch((e) => console.log(e))
                 .then((response) => response.json())
                 .then((responseData) => {
                   console.log(responseData);
                   console.log(responseData.url);
                   imageUrls.push(responseData.url);
                 });
      })
    }, Promise.resolve());
  }


  const images = bookDetails.bookPhotos.value;
  const imageUrls = [];

  uploadImages(images)
    .then(() => {
      console.log(imageUrls);
    });
  // createTextbookMutation({
  //   variables: {
  //     textbook: {
  //       id:
  //       title:
  //       uid:
  //       description:
  //       industryIdentifiers: {
  //         {},
  //       },
  //       authors:
  //       edition:
  //       images:
  //     }
  //   }
  // })

  // TODO: save to backend if everything is good
  // delete folder after submit is succesful
};

const checkForFormErrors = (bookDetails) => (dispatch) => {
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

  forEach(bookDetails , (bookDetail, key) => {
    const { value, humanizedValue } = bookDetail;

    if (!value) {
      errorsMessages.formHasErrors = true;
      errorsMessages[`${key}`] = `${humanizedValue} is required`;
    }
  });

  if (errorsMessages.formHasErrors) {
     dispatch({ type: FORM_HAS_ERRORS, payload: errorsMessages });
     return true;
  }

  return false
}
