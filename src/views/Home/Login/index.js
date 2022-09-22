import { PrimaryButton, Form, Input } from "components";
import React, { useReducer, useEffect } from "react";
import { reducer, actions, initialState } from "./reducer";
import { formValidator, ParagraphTextColor } from "utils";
import "./styles.sass";
export default function LoginScreen() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e) => {
    dispatch({
      type: actions.UPDATE_FORM_DATA,
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleSubmit = () => {
    formValidator({
      dispatch: dispatch,
      formConditions: state.formConditions,
      formData: state.formData,
      errors: state.errors,
      setErrors: actions.SET_ERRORS,
    });
  };

  return (
    <div className="login__screen">
      <div className="login__screen__left"></div>
      <div className="login__screen__right">
        <ParagraphTextColor modifiers={["h2"]}>
          Iniciar sesión
        </ParagraphTextColor>
        <Form onSubmit={e => e.preventDefault()}>
          {state.inputFields.map((input, index) => (
            <Input
              name={input.name}
              type={input.type}
              placeholder={input.placeholder}
              label={input.label}
              onChange={handleChange}
              key={index}
              error={{
                error: state.errors[input.name].error,
                message: state.errors[input.name].message,
              }}
            />
          ))}
          <PrimaryButton modifiers={["small"]} onClick={handleSubmit}>
            Iniciar sesión
          </PrimaryButton>
        </Form>
        <div className="login__footer">
          <ParagraphTextColor>
            ¿Aún no tienes una cuenta? <a href="/register">Regístrate</a>
          </ParagraphTextColor>
        </div>
      </div>
    </div>
  );
}
