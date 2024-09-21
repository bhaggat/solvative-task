export const convertToSearchParams = (query) => {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });
  return params;
};
export const getSearchParams = (query) => {
  const params = new URLSearchParams(query);
  const result = {};

  for (const [key, value] of params.entries()) {
    // Handle multiple values for the same key
    if (result[key]) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  }

  return { ...result };
};
