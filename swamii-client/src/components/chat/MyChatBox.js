import React, { useEffect, useState, useRef, useContext } from "react";
import { Container } from "react-bootstrap";
import socketIOClient from "socket.io-client";

import styles from "../../css/cssComponents/chat-box.module.css";
import ChatBubble from "../chat/ChatBubble";
import AppForm from "../form/AppForm";
import SubmitFormButton from "../form/SubmitFormButton";
import FormTextInput from "../form/FormTextInput";
import AuthContext from "../../auth/context";
import ChatContext from "../../chat/context";

function MyChatBox({ chatItemClicked }) {
  let currentUser = useContext(AuthContext).user;
  let { socket } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

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
    socket.emit("message", { message: newMessage, user: currentUser });
    //reset form/message bar
    resetForm({ values: "" });

    //append the messages with a new message, to avoid pinging db again
    setMessages([...messages, newMessage]);
  };

  useEffect(() => {
    //event handler for messages
    socket.on("partyGroupMessage", (data) => {
      setMessages(data);
    });
    //initializes the first call to grab data from DB, by making the message "", it will not be added to DB
    socket.emit("partyGroupMessage", chatItemClicked);

    //on de-mounting
    return () => {
      setMessages([]);
    };
  }, [socket, currentUser, chatItemClicked]);

  return (
    <div id="scrollBox" className={styles.all}>
      <Container className={styles.mainContainer}>
        {messages.sort(compareTo).map((message) => {
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
      <div className={styles.textInput}>
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
          <div className={styles.messageBar}>
            <FormTextInput placeholder="message" type="text" name="text" />
          </div>
          <div className={styles.buttonContainer}>
            <SubmitFormButton title="Send" />
          </div>
        </AppForm>
      </div>
    </div>
  );
}

export default MyChatBox;
