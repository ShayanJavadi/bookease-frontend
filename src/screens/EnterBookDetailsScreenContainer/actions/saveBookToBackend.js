const saveBookToBackend = (bookDetails, createTextbookMutation, imageUrls) => { // eslint-disable-line no-unused-vars
  const {
    bookTitle,
    bookAuthor,
    bookEdition,
    bookPrice,
    bookIsbn,
    bookDescription,
    bookCondition
  } = bookDetails;

  const textbookToSave = {
    title: bookTitle.value,
    description: bookDescription.value,
    industryIdentifiers: {
      type: "ISBN-13",
      identifier: bookIsbn.value,
    },
    authors: [bookAuthor.value],
    edition: bookEdition.value,
    images: imageUrls,
    condition: bookCondition.value,
    price: bookPrice.value,
  };

  createTextbookMutation({
    variables: {
      textbook: textbookToSave
    }
  })
  // .catch((e) => console.log(e))
  // .then((response) => {
  //   console.log(response);
  // });
  // TODO: delete image folder here
  return;
}

export default saveBookToBackend;
