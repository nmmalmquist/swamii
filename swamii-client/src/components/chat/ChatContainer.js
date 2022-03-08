import React, { useEffect, useState, useContext } from "react";
import socketIOClient from "socket.io-client";

import styles from "../../css/cssScreens/chat-container.module.css";

import ChatContext from "../../chat/context";
import MyChatBox from "../chat/MyChatBox";
import MyChatListItem from "../chat/MyChatItemList";
import ChatHeader from "./ChatHeader";
import { getAllUsers } from "../../api/users";
import ipAddress from "../../config";
import NewChat from "./NewChat";
import AuthContext from "../../auth/context";

function ChatContainer(props) {
  const BASE_DOMAIN = `http://${ipAddress}:5556`;
  const [chatListVisible, setChatListVisible] = useState(true);
  const [newChatVisible, setNewChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [socketContext, setSocketContext] = useState(null);
  const [chatItemClicked, setChatItemClicked] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const currentUser = useContext(AuthContext).user;

  const onListItemClick = (item) => {
    setChatListVisible(false);
    setChatItemClicked(item);
  };

  const goToNewChat = () => {
    setChatListVisible(false);
    setNewChatVisible(true);
  };

  const returnToChatList = () => {
    setChatListVisible(true);
    setChatItemClicked(null);
    setNewChatVisible(false);
  };

  const loadUsers = async () => {
    setAllUsers(await getAllUsers());
  };

  //we initially grab all of the messages data that pertains to the current user
  useEffect(() => {
    const socket = socketIOClient(BASE_DOMAIN)
    setSocketContext(socket);
  
    socket.emit("addUser", currentUser)
  
     //event handler for messages
     socket.on("initMessageGrab", (data) => {
      setMessages(data);
    });
  
    socket.on("privateMessage", (data) => {
      console.log("fired! +")
      socket.emit("initMessageGrab", { message: "", user: currentUser });
    });
  
    //initializes the first call to grab data from DB, by making the message "", it will not be added to DB
    socket.emit("initMessageGrab", { message: "", user: currentUser });
    loadUsers();
  }, [BASE_DOMAIN, currentUser,chatListVisible]);

  return (
    <ChatContext.Provider value={{ socketContext }}>
      <div className={styles.mainContainer}>
        <ChatHeader
          chatItemClicked={chatItemClicked}
          onBackClick={returnToChatList}
          onNewChatClick={goToNewChat}
          newChatIconVisible={!newChatVisible}
        />
        {chatListVisible && socketContext && allUsers ? (
          <MyChatListItem
            onListItemClick={onListItemClick}
            allUsers={allUsers}
            messages={messages}
          />
        ) : null}
        {!chatListVisible && socketContext && chatItemClicked ? (
          <MyChatBox chatItemClicked={chatItemClicked} allMessages = {messages} />
        ) : null}
        {newChatVisible && socketContext ? (
          <NewChat returnToChatList={returnToChatList} allUsers={allUsers} />
        ) : null}
      </div>
    </ChatContext.Provider>
  );
}

export default ChatContainer;
