import { ImagePicker } from "expo"
import extractImageDetails from "./extractImageDetails";
import uploadImage from "./uploadImage";
import {
  IMAGE_GALLERY_OPEN,
  IMAGE_GALLERY_CLOSED,
} from "./consts";

const selectImage = ({currentUser, updateUser}) => async (dispatch) => {
  dispatch({ type: IMAGE_GALLERY_OPEN });

  const result = await ImagePicker.launchImageLibraryAsync({ base64: true });

  if (!result.cancelled) {
    const imageUri = result.uri;
    const { imageName, imageType } = extractImageDetails(imageUri);

    console.log(result.base64);
    console.log({ imageUri, imageName, imageType })

    uploadImage({ imageUri, imageName, imageType })
      .catch((e) => console.log(e)) // eslint-disable-line no-console
      .then((response) => response.json())
      .then((responseData) => { console.log(responseData); });

    const newProfileData = Object.assign({}, currentUser);
    //newProfileData.fullName = fullName;
    //this.props.updateUser(newProfileData);
  }

  return dispatch({ type: IMAGE_GALLERY_CLOSED });
}

export default selectImage;
