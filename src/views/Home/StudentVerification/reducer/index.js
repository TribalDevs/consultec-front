import { actions } from "./actions";
import { initialState } from "./constants";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FILTER_STUDENTS:
      return {
        ...state,
        filterStudents: action.payload,
      };
    case actions.GET_STUDENTS_REQUEST:
      return {
        ...state,
        getStudents: {
          ...state.getStudents,
          loading: true,
        },
      };
    case actions.GET_STUDENTS_SUCCESS:
      return {
        ...state,
        getStudents: {
          ...state.getStudents,
          loading: false,
          data: action.payload.message.filter(
            (student) => student.role === "Student"
          ),
        },
      };
    case actions.GET_STUDENTS_FAILURE:
      return {
        ...state,
        getStudents: {
          ...state.getStudents,
          loading: false,
          error: action.payload,
        },
      };
    case actions.VERIFY_STUDENT_REQUEST:
      return {
        ...state,
        verifyStudent: {
          ...state.verifyStudent,
          loading: true,
        },
        selectedIdMessage: "Cargando...",
      };
    case actions.VERIFY_STUDENT_SUCCESS:
      return {
        ...state,
        verifyStudent: {
          ...state.verifyStudent,
          loading: false,
          data: action.payload,
          success: true,
        },
        selectedIdMessage: "Verificado",
      };
    case actions.VERIFY_STUDENT_FAILURE:
      return {
        ...state,
        verifyStudent: {
          ...state.verifyStudent,
          loading: false,
          error: action.payload,
        },
        selectedIdMessage: "Error",
      };
    case actions.SET_SELECTED_ID:
      return {
        ...state,
        selectedId: action.payload.id,
        selectedIdMessage: "Verificado",
      };
    default:
      return state;
  }
};
export { reducer, actions, initialState };
