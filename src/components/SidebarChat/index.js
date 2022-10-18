import { TextComponent } from "components/Texts";
import React from "react";
import { ParagraphTextColor } from "utils";
import "./styles.sass";
const users = [
  {
    name: "Skyler White",
    photo: "https://i.pinimg.com/originals/f1/85/6d/f1856d7b4f814ae073384f404054a793.jpg",
  },
  {
    name: "Walter White",
    photo: "https://i.pinimg.com/originals/f1/85/6d/f1856d7b4f814ae073384f404054a793.jpg",
  },
  {
    name: "Jesse Pinkman",
    photo: "https://i.pinimg.com/originals/f1/85/6d/f1856d7b4f814ae073384f404054a793.jpg",
  }
];
export const SidebarChat = () => {
  return (
    <div className="sidebar__chat">
      {users.map((user, index) => (
        <div className="user__item">
          <TextComponent
            type="h4"
            text={{
              en: user.name,
              es: user.name,
            }}
          />
        </div>
      ))}
    </div>
  );
};
