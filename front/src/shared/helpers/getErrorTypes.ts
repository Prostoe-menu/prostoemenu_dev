const getErrorTypes = (errorObj) => {
  const result = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const value of Object.values(errorObj)) {
    result.push(value.type);
  }
  return result;
};

export default getErrorTypes;
