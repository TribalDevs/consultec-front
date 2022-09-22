export const createFormData = (data) => {
  const formData = new FormData();
  for (var key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};

export const formValidator = ({
  formData,
  formConditions,
  dispatch,
  errors,
  setErrors,
}) => {
  // Destructuring
  let errorsAux = { ...errors };
  // Validate formData
  Object.keys(formConditions).forEach((key) => {
    let { passed, error } = formConditions[key].condition(formData[key]);
    if (passed || !formConditions[key].required) {
      errorsAux[key].error = false;
    } else {
      errorsAux[key].error = true;
      errorsAux[key].message = error;
    }
  });
  dispatch({ type: setErrors, payload: errorsAux });
  // return if there are errors
  if (Object.values(errorsAux).includes(true)) {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
    return false;
  }
  return true;
};
