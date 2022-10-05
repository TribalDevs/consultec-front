import React from "react";
import { ParagraphTextColor } from "utils";
import "./styles.sass";
export const Message = (props) => {
  return (
    <div className="message__container">
      <div className="message__content">
        <ParagraphTextColor>Hola</ParagraphTextColor>
        {/* <ParagraphTextColor className="message__date">
          {new Date()}
        </ParagraphTextColor> */}
      </div>
    </div>
  );
};
