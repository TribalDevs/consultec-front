import { PrimaryButton, Form, Input, SecondaryButton } from "components";
import React, { useReducer, useEffect } from "react";
import { reducer, actions, initialState } from "./reducer";
import { formValidator, ParagraphTextColor } from "utils";
import "./styles.sass";
export default function RegisterScreen() {
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
  const handleNextStep = () => {
    const passedStep = formValidator({
      dispatch: dispatch,
      formConditions: state.formConditions,
      formData: state.formData,
      errors: state.errors,
      setErrors: actions.SET_ERRORS,
      step: state.step,
    });
    if (passedStep) {
      let register__form = document.getElementById("register__form");
      register__form.classList.add("next__step");
      setTimeout(() => {
        dispatch({
          type: actions.SET_STEP,
          payload: state.step + 1,
        });
        register__form.classList.remove("next__step");
      }, 300);
    }
  };
  const handlePrevStep = () => {
    let register__form = document.getElementById("register__form");
    // remove class to form
    register__form.classList.add("prev__step");
    setTimeout(() => {
      dispatch({
        type: actions.SET_STEP,
        payload: state.step - 1,
      });
      register__form.classList.remove("prev__step");
    }, 300);
  };
  return (
    <div className="register__screen">
      <div className="register__screen__left"></div>
      <div className="register__screen__right">
        <ParagraphTextColor modifiers={["h2"]}>
          Registro de usuario
        </ParagraphTextColor>
        <Form onSubmit={(e) => e.preventDefault()} id="register__form">
          {state.inputFields
            .filter((input) => input.step === state.step)
            .map((input, index) => (
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
                value={state.formData[input.name]}
              />
            ))}
          <div className="action__buttons">
            {/* Previous step */}
            {state.step > 1 && (
              <SecondaryButton onClick={handlePrevStep}>
                Anterior
              </SecondaryButton>
            )}
            {/* Next step */}
            {state.step < state.totalSteps && (
              <PrimaryButton onClick={handleNextStep}>Siguiente</PrimaryButton>
            )}

            {/* Submit */}
            {state.step === state.totalSteps && (
              <PrimaryButton onClick={handleSubmit}>Enviar</PrimaryButton>
            )}
          </div>
        </Form>

        <div className="login__footer">
          <ParagraphTextColor>
            ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
          </ParagraphTextColor>
        </div>
      </div>
    </div>
  );
}