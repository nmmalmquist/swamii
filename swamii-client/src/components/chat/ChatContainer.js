import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import styles from "../../css/cssScreens/chat-container.module.css"

import ChatContext from "../../chat/context";
import MyChatBox from "../chat/MyChatBox";
import MyChatListItem from "../chat/MyChatItemList";
import ChatHeader from "./ChatHeader";
import { getAllUsers } from "../../api/users";
import ipAddress from "../../config";
import NewChat from "./NewChat";

function ChatContainer(props) {
  const BASE_DOMAIN = `http://${ipAddress}:5556`;
  const [chatListVisible, setChatListVisible] = useState(true);
  const [newChatVisible, setNewChatVisible] = useState(false);
  const [socket, setSocket] = useState(null);
  const [chatItemClicked, setChatItemClicked] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  const onListItemClick = (item) => {
    setChatListVisible(false);
    setChatItemClicked(item);
  };

  const goToNewChat = () => {
    setChatListVisible(false);
    setNewChatVisible(true)
  }

  const returnToChatList = () => {
    setChatListVisible(true);
    setChatItemClicked(null)
    setNewChatVisible(false)
  };

  const loadUsers = async () => {
    setAllUsers(await getAllUsers());
    
  };


  useEffect(() => {
    setSocket(socketIOClient(BASE_DOMAIN));
    loadUsers();
  }, [BASE_DOMAIN]);
 
  return (
    <ChatContext.Provider value={{ socket }}>
      <div className={styles.mainContainer}>
        <ChatHeader
          chatItemClicked={chatItemClicked}
          onBackClick={returnToChatList}
          onNewChatClick={goToNewChat}
          newChatIconVisible={!newChatVisible}
        />
        {chatListVisible && socket && allUsers ? (
          <MyChatListItem
            onListItemClick={onListItemClick}
            allUsers={allUsers}
          />
        ) : null}
        {!chatListVisible && socket && chatItemClicked ? (
          <MyChatBox chatItemClicked={chatItemClicked} />
        ) : null}
        {newChatVisible && socket ? (<NewChat returnToChatList={returnToChatList} allUsers={allUsers}/>) : null}
      </div>
    </ChatContext.Provider>
  );
}

export default ChatContainer;
