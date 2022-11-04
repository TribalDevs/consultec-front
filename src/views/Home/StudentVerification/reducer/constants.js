export const initialState = {
  getStudents: {
    loading: false,
    error: null,
    data: [],
  },
  filterStudents: "all",
  verifyStudent: {
    loading: false,
    error: null,
    data: null,
    success: false,
  },
  selectedId: null,
  selectedIdMessage: "Verificar",
};
