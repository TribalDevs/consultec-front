import { PrimaryButton, Form, Input } from "components";
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
          <Input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            label={"Correo electrónico"}
          />
          <Input
            name="password"
            type="password"
            placeholder="Contraseña"
            label={"Contraseña"}
          />
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
