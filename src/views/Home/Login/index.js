import { Form, Input, Button } from "components";
import React, { useReducer, useEffect } from "react";
import { reducer, actions, initialState } from "./reducer";
import { formValidator } from "utils";
import { TextComponent } from "components";
import "./styles.sass";
import { petition } from "api";
export default function LoginScreen() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e) => {
    dispatch({
      type: actions.UPDATE_FORM_DATA,
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleSubmit = () => {
    var isPassed = formValidator({
      dispatch: dispatch,
      formConditions: state.formConditions,
      formData: state.formData,
      errors: state.errors,
      setErrors: actions.SET_ERRORS,
    });
    if (isPassed) {
      petition({
        url: "/user/login/",
        method: "POST",
        body: state.formData,
        constants: {
          REQUEST: actions.LOGIN_REQUEST,
          SUCCESS: actions.LOGIN_SUCCESS,
          FAILURE: actions.LOGIN_FAILURE,
        },
        dispatch: dispatch,
      });
    }
  };

  return (
    <div className="login__screen">
      <div className="login__screen__left"></div>
      <div className="login__screen__right">
        <TextComponent
          type="h2"
          text={{
            en: "Login",
            es: "Iniciar sesión",
          }}
        />
        <Form onSubmit={(e) => e.preventDefault()}>
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
          <Button
            text={{
              en: "Login",
              es: "Iniciar sesión",
            }}
            modifiers={["small"]}
            type="primary"
            onClick={handleSubmit}
            loading={state.login.loading}
          />
        </Form>
        <div className="login__footer">
          <TextComponent
            type="h4"
            text={{
              es: (
                <>
                  ¿Aún no tienes una cuenta? <a href="/register">Regístrate</a>
                </>
              ),
              en: (
                <>
                  Don't have an account? <a href="/register">Register</a>
                </>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}
