import React, { useEffect, useState, useRef, useContext } from "react";
import { Container } from "react-bootstrap";
import socketIOClient from "socket.io-client";

import styles from "../../css/cssComponents/chat-box.module.css";
import ChatBubble from "../chat/ChatBubble";
import AppForm from "../form/AppForm";
import AuthContext from "../../auth/context";
import ChatContext from "../../chat/context";
import ChatInput from "./ChatInput";
import { chatItemToRoomMessages } from "../../chat/MessageConverter";

function MyChatBox({ chatItemClicked, allMessages }) {
  let currentUser = useContext(AuthContext).user;
  let { socketContext } = useContext(ChatContext);
  const [roomMessages, setRoomMessages] = useState([]);

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  const compareTo = (firstEl, secondEl) => {
    if (firstEl.dateTimeCreated < secondEl.dateTimeCreated) {
      return -1;
    } else if (firstEl.dateTimeCreated > secondEl.dateTimeCreated) {
      return 1;
    } else {
      return 0;
    }
  };

  const handleSubmit = (newMessage, { resetForm }) => {
    if (newMessage.text === "") return;
    socketContext.emit("privateMessage", { message: newMessage, user: currentUser });
    //reset form/message bar
    resetForm({ values: "" });

    //append the messages with a new message, to avoid pinging db again
    setRoomMessages([...roomMessages, newMessage]);
  };

  useEffect(() => {
    setRoomMessages(chatItemToRoomMessages(chatItemClicked, allMessages))
    }, [chatItemClicked, allMessages]);

  return (
    <div id="scrollBox" className={styles.all}>
      <Container className={styles.mainContainer}>
        {roomMessages.sort(compareTo).map((message) => {
          if (message.sender === currentUser.username) {
            return (
              <ChatBubble
                key={message._id}
                variant="sender"
                text={message.text}
                username={message.sender}
              />
            );
          } else {
            return (
              <ChatBubble
                key={message._id}
                variant="receiver"
                text={message.text}
                username={message.sender}
              />
            );
          }
        })}
        <AlwaysScrollToBottom />
      </Container>
      <AppForm
        initialValues={{
          text: "",
          sender: currentUser.username,
          senderId: currentUser._id,
          recipient: chatItemClicked.title,
          //this is a temporary unique ID for all new messages that get added in a session before the db can create the GUID
          _id: new Date().toString() + Math.random() * 1000,
        }}
        onSubmit={handleSubmit}
      >
        <ChatInput />
      </AppForm>
    </div>
  );
}

export default MyChatBox;
