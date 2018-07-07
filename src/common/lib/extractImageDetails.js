export default (imageUri) => {
  const matchImageDetails = /\/([^\/]*)\.(.*)/;
  const matches = imageUri.match(matchImageDetails);

  const imageName = matches[1];
  const imageType = matches[2];

  return { imageName, imageType };
}
