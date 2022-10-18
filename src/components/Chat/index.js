import React from "react";
import { Message } from "components/Message";
import "./styles.sass";
import { Button } from "components/Buttons";
import { TextComponent } from "components/Texts";
import { Form } from "components/Forms";
import { RiSendPlaneFill } from "react-icons/ri";
export const Chat = () => {
  return (
    <div className="chat__component">
      <div className="chat__header">
        <TextComponent
          type="h4"
          text={{
            en: "Walter White",
            es: "Walter White",
          }}
        />
      </div>
      <div className="chat__history">
        <Message />
      </div>
      <div className="chat__input">
        <Form>
          <input placeholder="Enviar mensaje" />
          <div className="chat__input__button">
            <RiSendPlaneFill />
          </div>
        </Form>
      </div>
    </div>
  );
};
