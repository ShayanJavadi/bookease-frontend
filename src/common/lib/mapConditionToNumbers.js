const mapConditionToNumbers = (condition) => {
  const mapping = {
    excellent: 2,
    good: 1,
    fair: 0,
  }

  return mapping[condition];
}

export default mapConditionToNumbers;
