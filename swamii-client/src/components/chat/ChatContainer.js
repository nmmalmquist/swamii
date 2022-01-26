import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import ChatContext from "../../chat/context";
import MyChatBox from "../chat/MyChatBox";
import MyChatListItem from "../chat/MyChatItemList";
import ChatHeader from "./ChatHeader";
import { getAllUsers } from "../../api/users";
import ipAddress from "../../config";

function ChatContainer(props) {
  const BASE_DOMAIN = `http://${ipAddress}:5556`;
  const [chatListVisible, setChatListVisible] = useState(true);
  const [socket, setSocket] = useState(null);
  const [chatItemClicked, setChatItemClicked] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  const onListItemClick = (item) => {
    setChatListVisible(false);
    setChatItemClicked(item);
  };

  const returnToChatList = () => {
    setChatListVisible(true);
  };

  const loadUsers = async() => {
      setAllUsers(await getAllUsers())
  }

  useEffect(() => {
    setSocket(socketIOClient(BASE_DOMAIN));
    loadUsers();
  }, [BASE_DOMAIN]);

  return (
    <ChatContext.Provider value={{ socket }}>
      <div>
        {chatListVisible && socket && allUsers ? (
          <MyChatListItem onListItemClick={onListItemClick} allUsers={allUsers} />
        ) : null}
        {!chatListVisible && socket && chatItemClicked ? (
          <>
            <ChatHeader
              chatItemClicked={chatItemClicked}
              onBackClick={returnToChatList}
            />
            <MyChatBox chatItemClicked={chatItemClicked} />
          </>
        ) : null}
      </div>
    </ChatContext.Provider>
  );
}

export default ChatContainer;
