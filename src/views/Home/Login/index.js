import { PrimaryButton } from "components";
import { Form } from "components/Forms";
import React from "react";
import { ParagraphTextColor } from "utils";
import "./styles.sass";
export default function LoginScreen() {
  return (
    <div className="login__screen">
      <div className="login__screen__left"></div>
      <div className="login__screen__right">
        <ParagraphTextColor modifiers={["h2"]}>
          Iniciar sesión
        </ParagraphTextColor>
        <Form>
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" name="email" id="email" />
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" id="password" />
          <PrimaryButton modifiers={["small"]}>Iniciar sesión</PrimaryButton>
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
