const mapConditionToNumbers = (condition) => {
  const mapping = {
    excellent: 3,
    good: 2,
    fair: 1,
    poor: 0,
  }

  return mapping[condition];
}

export default mapConditionToNumbers;
