const extractImageDetails = (image) => { // eslint-disable-line no-unused-vars
  const matchImageDetails = /\/(Image_(.*).(jpg))/;
  const imageDetails = image.uri.match(matchImageDetails);
  const imageName = imageDetails[1];
  const imageType = imageDetails[3];

  return { imageName, imageType };
}

export default extractImageDetails;
