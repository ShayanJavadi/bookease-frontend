import { ImagePicker } from "expo"
import extractImageDetails from "./extractImageDetails";
import uploadImage from "./uploadImage";
import {
  IS_UPLOADING,
  IMAGE_GALLERY_OPEN,
  IMAGE_GALLERY_CLOSED,
} from "./consts";

const selectImage = ({ currentUser, updatePhotoUrl, updateUserData }) => async (dispatch) => {
  dispatch({ type: IMAGE_GALLERY_OPEN });

  const result = await ImagePicker.launchImageLibraryAsync({ base64: true });

  if (!result.cancelled) {
    dispatch({ type: IS_UPLOADING });

    const localPhotoUri = result.uri;
    const { imageName, imageType } = extractImageDetails(localPhotoUri);

    const response = await uploadImage({ imageUri: localPhotoUri, imageName, imageType });
    const uploadedPhotoUri = (await response.json()).url;

    const newProfileData = Object.assign({}, currentUser);
    newProfileData.photoURL = uploadedPhotoUri;

    await updatePhotoUrl({
      variables: {
        phoneNumber: currentUser.phoneNumber,
        photoUrl: uploadedPhotoUri,
      }
    });

    await updateUserData(newProfileData);
  }

  return dispatch({ type: IMAGE_GALLERY_CLOSED });
}

export default selectImage;
