import { BACKEND_AUTHENTICATION_HEADER, BACKEND_URL } from "src/config.json";
import base64 from "base-64";
import extractImageDetails from "./extractImageDetails"

export default async (imageUri) => {
  const { imageType, imageName } = extractImageDetails(imageUri);

  const api =`${BACKEND_URL}/upload`;
  const formData = new FormData();

  formData.append("image", {
    uri: imageUri,
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

  const response = await fetch(api, options);
  const { url } = await response.json();

  return url;
}
