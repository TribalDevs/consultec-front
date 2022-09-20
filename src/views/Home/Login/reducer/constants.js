export const initialState = {
  formData: {
    email: "",
    password: "",
  },
  login: {
    loading: false,
    error: null,
    success: false,
    data: null,
  },
  inputFields: [
    {
      name: "email",
      type: "email",
      placeholder: "Correo electrónico",
      label: "Correo electrónico",
      isValid: (value) => {
        if (!value) {
          return "El correo electrónico es requerido";
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          return "El correo electrónico no es válido";
        }
        return null;
      },
    },
  ],
};
