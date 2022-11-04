import { petition } from "api";
import { TextComponent } from "components";
import React, { useEffect, useReducer } from "react";
import { actions, initialState, reducer } from "./reducer";
import "./styles.sass";

export default function StudentVerification() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    petition({
      url: "/admin/users/",
      method: "GET",
      dispatch,
      constants: {
        REQUEST: actions.GET_STUDENTS_REQUEST,
        SUCCESS: actions.GET_STUDENTS_SUCCESS,
        FAILURE: actions.GET_STUDENTS_FAILURE,
      },
      token: true,
    });
  }, []);
  const verifyStudent = (id) => {
    petition({
      url: `/admin/validate/${id}/`,
      method: "PUT",
      body: {},
      dispatch,
      constants: {
        REQUEST: actions.VERIFY_STUDENT_REQUEST,
        SUCCESS: actions.VERIFY_STUDENT_SUCCESS,
        FAILURE: actions.VERIFY_STUDENT_FAILURE,
      },
      token: true,
    });
  };
  const renderStudents = () => {
    // let auxStudents = testStudents;
    // if (state.filterStudents != "all") {
    //   auxStudents = testStudents?.filter(
    //     (student) => student.status == state.filterStudents
    //   );
    // }
    return state.getStudents.data.map((student, index) => (
      <tr key={index}>
        <td>{`${student.first_name} ${student.last_name}`}</td>
        <td>{student.email}</td>
        <td>{student.is_validated ? "Validado" : "Sin validar"}</td>
        <td>
          {!student.is_validated ? (
            <button>
              <TextComponent
                type="p"
                text={
                  state.selectedId == student.id
                    ? state.selectedIdMessage
                    : student.is_validated
                    ? "Validado"
                    : "Validar"
                }
                disableLocales
                modifiers={["link"]}
                onClick={() => {
                  dispatch({
                    type: actions.SET_SELECTED_ID,
                    payload: student.id,
                  });
                  verifyStudent(student.id);
                }}
              />
            </button>
          ) : (
            <TextComponent type="p" text={"Verificado"} disableLocales />
          )}
        </td>
      </tr>
    ));
  };
  if (state.getStudents.error) {
    return (
      <div className="verification__component">
        <TextComponent
          type="h1"
          text={state.getStudents.error.detail}
          disableLocales
        />
      </div>
    );
  }
  return (
    <div className="verification__component">
      <div className="verification__header">
        <TextComponent
          type="h1"
          text="Verificación de estudiantes"
          disableLocales
        />
      </div>
      <div className="verification__table">
        <div className="verification__table__filter">
          <TextComponent type="h2" text="Filtrar por estado" disableLocales />
          {/* <select
            value={state.filterStudents}
            onChange={(e) => {
              dispatch({
                type: actions.FILTER_STUDENTS,
                payload: e.target.value,
              });
            }}
          >
            <option value="all">
              <TextComponent
                type="h2"
                text={{
                  en: "All students",
                  es: "Todos los estudiantes",
                }}
              />
            </option>
            <option value="pending">
              <TextComponent
                type="h2"
                text={{
                  en: "Not verified students",
                  es: "Estudiantes no verificados",
                }}
              />
            </option>
            <option value="verified">
              <TextComponent
                type="h2"
                text={{
                  en: "Verified students",
                  es: "Estudiantes verificados",
                }}
              />
            </option>
          </select> */}
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <TextComponent type="p" text={"Nombre"} disableLocales />
              </th>
              <th>
                <TextComponent
                  type="p"
                  text={"Correo electrónico"}
                  disableLocales
                />
              </th>
              <th>
                <TextComponent
                  type="p"
                  text={"Estado de verificación"}
                  disableLocales
                />
              </th>
              <th>
                <TextComponent type="p" text={"Acciones"} disableLocales />
              </th>
            </tr>
          </thead>
          <tbody>{renderStudents()}</tbody>
        </table>
      </div>
    </div>
  );
}
