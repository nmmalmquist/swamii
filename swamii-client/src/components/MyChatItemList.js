import React, { useEffect, useState, useRef, useContext } from "react";
import { Container } from "react-bootstrap";
import "react-chat-elements/dist/main.css";
import { ChatList } from "react-chat-elements";
import { useNavigate } from "react-router-dom";

import styles from "../css/cssComponents/chat-box.module.css";

import ChatBubble from "./ChatBubble";
import AppForm from "./form/AppForm";
import SubmitFormButton from "./form/SubmitFormButton";
import FormTextInput from "./form/FormTextInput";
import AuthContext from "../auth/context";
import { getAllUsers } from "../api/users";
import ChatContext from "../chat/context";

function MyChatListItem({ onListItemClick }) {
  let { socket } = useContext(ChatContext);
  let currentUser = useContext(AuthContext).user;

  const [chatListData, setChatListData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const loadUsers = async () => {
    setAllUsers(await getAllUsers());
  };

  useEffect(() => {
    //event handler for messages
    socket.on("chatItem", (data) => {
      setChatListData(data);
    });
    //initializes the first call to grab data from DB, by making the message "", it will not be added to DB
    socket.emit("message", { message: "", user: currentUser });

    //Get all users to be able to get avatar URLs
    loadUsers();

    //on unmounting component, we set state back to null to prevent memory leak
    return () => {
      setAllUsers({}); // This worked for me
      setChatListData({})
    };
  }, [socket, currentUser]);

  return (
    <div id="scrollBox" className={styles.all}>
      <Container className={styles.mainContainer}>
        {chatListData.map((chatItemData) => {
          return (
            <ChatList
              key={chatItemData._id}
              className="chat-item"
              dataSource={[
                {
                  avatar: allUsers.filter(
                    (i) => i.username === chatItemData.title
                  )[0].avatarURL,
                  alt: "Avatar",
                  title: chatItemData.title,
                  subtitle: chatItemData.text,
                  date: new Date(chatItemData.dateTimeCreated),
                  unread: 0,
                  sender: chatItemData.sender,
                  recipient: chatItemData.recipient,
  
                },
              ]}
              onClick={(item) => {
                onListItemClick(item);
              }}
            />
          );
        })}
        {/* <AlwaysScrollToBottom /> */}
      </Container>
    </div>
  );
}

export default MyChatListItem;
