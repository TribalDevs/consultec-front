import React from "react";
import { ParagraphTextColor } from "utils";
import { Message } from "components/Message";
import "./styles.sass";
import { PrimaryButton } from "components/Buttons";
export const Chat = () => {
  return (
    <div className="chat__component">
      <div className="chat__header">
        <ParagraphTextColor>Leonardo Mercado</ParagraphTextColor>
      </div>
      <div className="chat__history">
        <Message />
      </div>
      <div className="chat__input">
        <form>
          <input placeholder="Enviar mensaje" />
          <PrimaryButton>
            Enviar mensaje
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};
