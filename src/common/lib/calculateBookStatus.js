const calculateBookStatus = ({ isSold, isArchived }) => {
  if (isSold) {
    return "sold";
  }

  if (isArchived) {
    return "archived";
  }

  return "active";
}

export default calculateBookStatus;
