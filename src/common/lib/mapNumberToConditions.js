const mapNumberToConditions = (condition) => {
  const mapping = {
    2: "excellent",
    1: "good",
    0: "fair",
  }

  return mapping[condition];
}

export default mapNumberToConditions;
