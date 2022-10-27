import { TextComponent } from "components/Texts";
import React from "react";
import "./styles.sass";
const image =
  "https://i.pinimg.com/originals/f1/85/6d/f1856d7b4f814ae073384f404054a793.jpg";
export const Message = (props) => {
  return (
    <div className="message__container">
      <div className="message__image">
        <img src={image} alt="user" />
      </div>
      <div className="message__content">
        {/* <TextComponent
          type="p"
          text={{
            en: "Jesse jane no se mueve",
            es: "Jesse jane no se mueve",
          }}
        /> */}
        {/* <ParagraphTextColor className="message__date">
          {new Date()}
        </ParagraphTextColor> */}
      </div>
    </div>
  );
};
