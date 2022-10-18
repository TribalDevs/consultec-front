import { Chat } from "components/Chat";
import { SidebarChat } from "components/SidebarChat";
import React from "react";
import io from "socket.io-client";
import "./styles.sass";
const socket = io.connect("http://localhost:5051");

export default function HomeScreen() {
  return (
    <div className="home__screen">
      <SidebarChat />
      <div className="chat__content">
        <Chat />
      </div>
    </div>
  );
}
