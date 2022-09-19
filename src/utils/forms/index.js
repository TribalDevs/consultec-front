export const createFormData = (data) => {
  const formData = new FormData();
  for (var key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};
