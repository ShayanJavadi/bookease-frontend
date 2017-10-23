import { forEach } from "lodash";
import { FileSystem, ImagePicker } from "expo"
import {
  FORM_HAS_ERRORS,
  UPDATE_PHOTOS,
  PHOTO_GALLERY_OPEN,
  PHOTO_GALLERY_CLOSED,
} from "./consts";

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
  const errorsMessages = {
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
     return dispatch({ type: FORM_HAS_ERRORS, payload: errorsMessages });
  }

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
