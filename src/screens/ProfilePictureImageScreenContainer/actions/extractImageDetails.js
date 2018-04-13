const extractImageDetails = (image) => { // eslint-disable-line no-unused-vars
  const matchImageDetails = /\/([^\/]*)\.(.*)/;
  const matches = image.match(matchImageDetails);

  const imageName = matches[1];
  const imageType = matches[2];

  return { imageName, imageType };
}

export default extractImageDetails;
