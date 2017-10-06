import { forEach } from "lodash";
import { FileSystem } from "expo"
import {
  FORM_HAS_ERRORS,
  UPDATE_PHOTOS,
  FORM_RQ,
} from "./consts";

export const deletePhoto = (uri) => async (dispatch) => {
  FileSystem.deleteAsync(uri)
    .then(() => {
      dispatch(updatePhotos());
    })
}

export const updatePhotos = () => async (dispatch) => {
  console.log('updaitng');
  FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}photos`)
    .then((files) => {
      const photos = [];
      files.map((file, index) => {
        photos.push({ uri: `${FileSystem.documentDirectory}photos/${file}`, key: index })
      })
      console.log(photos);
      return dispatch({ type: UPDATE_PHOTOS, payload: photos});
    })
}

export const createNewBook = (bookDetails) => async (dispatch) => {
  const errorsMessages = {
    bookTitle: "",
    bookAuthor: "",
    bookEdition: "",
    bookCondition: "",
    bookPrice: "",
    bookIsbn: "",
    bookDescription: "",
    formHasErrors: false,
  }

  forEach(bookDetails ,(bookDetail, key) => {
    const { value, humanizedValue } = bookDetail;
    if (!value) {
      errorsMessages.formHasErrors = true;
      errorsMessages[`${key}`] = `${humanizedValue} is required`;
    }
  })

  if (errorsMessages.formHasErrors) {
     dispatch({ type: FORM_HAS_ERRORS, payload: errorsMessages })
  }

  // TODO: save to backend if everything is good
  // delete folder after submit is succesful
  // FileSystem.deleteAsync(FileSystem.documentDirectory + 'photos')
  //   .then(() => {
  //     // clean up state here
  //   });

};
