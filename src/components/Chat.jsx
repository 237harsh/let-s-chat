import React, { useContext } from "react";

import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src="https://t4.ftcdn.net/jpg/01/07/57/91/240_F_107579101_QVlTG43Fwg9Q6ggwF436MPIBTVpaKKtb.jpg" alt="cam" />
          <img src="https://img.icons8.com/office/2x/plus-2-math.png" alt="add" />
          <img src="https://www.shutterstock.com/image-vector/electricity-socket-icon-flat-style-600w-246526441.jpg" alt="more" />
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;