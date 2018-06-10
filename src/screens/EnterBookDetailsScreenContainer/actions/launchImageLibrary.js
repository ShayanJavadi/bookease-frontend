import { ImagePicker } from "expo"
import {
  IMAGE_GALLERY_OPEN,
  IMAGE_GALLERY_CLOSED,
} from "./consts";
import addImageFromLibrary from "./addImageFromLibrary";

const launchImageLibrary = () => async (dispatch) => {
  dispatch({ type: IMAGE_GALLERY_OPEN });
  let result = await ImagePicker.launchImageLibraryAsync({ base64: true });

  if (!result.cancelled) {
    return addImageFromLibrary(result, dispatch);
  }

  return dispatch({ type: IMAGE_GALLERY_CLOSED });
}

export default launchImageLibrary;
