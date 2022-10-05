import React from "react";
import { ParagraphTextColor } from "utils";
import "./styles.sass";
const users = [
  {
    name: "Leonardo Mercado",
    photo: "",
  },
  {
    name: "Jazziel Bello",
    photo: "",
  },
];
export const SidebarChat = () => {
  return (
    <div className="sidebar__chat">
      {users.map((user, index) => (
        <div className="user__item">
          <ParagraphTextColor>{user.name}</ParagraphTextColor>
        </div>
      ))}
    </div>
  );
};
