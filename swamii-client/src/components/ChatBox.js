import React, { useEffect, useState, useRef, useContext } from "react";
import { Container } from "react-bootstrap";
import socketIOClient from "socket.io-client";

import styles from "../css/cssComponents/chat-box.module.css";
import ChatBubble from "./ChatBubble";
import AppForm from "./form/AppForm";
import SubmitFormButton from "./form/SubmitFormButton";
import FormTextInput from "./form/FormTextInput";
import AuthContext from "../auth/context";

function ChatBox(props) {
  let currentUser = useContext(AuthContext).user;
  // console.log("this user : " + JSON.stringify(currentUser));
  const [messages, setMessages] = useState([]);
  // const [messages, setMessages] = useState([
  //   {
  //     username: "user",
  //     userId: 1,
  //     dateTimeSent: "02/22/2022 12:00pm",
  //     text: "Hello, Nick",
  //   },
  //   {
  //     username: "jmalm",
  //     userId: 1,
  //     dateTimeSent: "02/22/2022 12:00pm",
  //     text: "Hello, Nick",
  //   },
  //   {
  //     username: "user",
  //     userId: 1,
  //     dateTimeSent: "02/22/2022 12:00pm",
  //     text: "Hello, Nick",
  //   },
  //   {
  //     username: "jmalm",
  //     userId: 1,
  //     dateTimeSent: "02/22/2022 12:00pm",
  //     text: "Hello, Nick",
  //   },
  //   {
  //     username: "user",
  //     userId: 1,
  //     dateTimeSent: "02/22/2022 12:00pm",
  //     text: "Hello, Nick",
  //   },
  //   {
  //     username: "jmalm",
  //     userId: 1,
  //     dateTimeSent: "02/22/2022 12:00pm",
  //     text: "Hello, Nick",
  //   },
  //   {
  //     username: "user",
  //     userId: 1,
  //     dateTimeSent: "02/22/2022 12:00pm",
  //     text: "Hello, Nick",
  //   },
  //   {
  //     username: "jmalm",
  //     userId: 1,
  //     dateTimeSent: "02/22/2022 12:00pm",
  //     text: "Hello, Nick",
  //   },
  //   {
  //     username: "user",
  //     userId: 1,
  //     dateTimeSent: "02/22/2022 12:00pm",
  //     text: "Hello, Nick",
  //   },
  //   {
  //     username: "jmalm",
  //     userId: 1,
  //     dateTimeSent: "02/22/2022 12:00pm",
  //     text: "Hello, Nick",
  //   },
  //   {
  //     username: "user",
  //     userId: 1,
  //     dateTimeSent: "02/22/2022 12:00pm",
  //     text: "Hello, Nick",
  //   },
  //   {
  //     username: "jmalm",
  //     userId: 1,
  //     dateTimeSent: "02/22/2022 12:00pm",
  //     text: "Hello, Nick",
  //   },
  //   {
  //     username: "user",
  //     userId: 1,
  //     dateTimeSent: "02/22/2022 12:00pm",
  //     text: "Hello, Nick",
  //   },
  //   {
  //     username: "jmalm",
  //     userId: 1,
  //     dateTimeSent: "02/22/2022 12:00pm",
  //     text: "Hello, Nick",
  //   },
  //   {
  //     username: "user",
  //     userId: 1,
  //     dateTimeSent: "02/22/2022 12:00pm",
  //     text: "Hello, Nick",
  //   },
  //   {
  //     username: "jmalm",
  //     userId: 1,
  //     dateTimeSent: "02/22/2022 12:00pm",
  //     text: "Hello, Nick",
  //   },
  // ]);

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  const handleSubmit = (newMessage, { resetForm }) => {
    if (newMessage.text === "") return;

    //establish connection
    const socket = socketIOClient("10.225.146.61:5556");
    socket.emit("message", newMessage);

    //reset form/message bar
    resetForm({ values: "" });
  };

  useEffect(() => {
    //establish connection
    const socket = socketIOClient("10.225.146.61:5556");
    //event handler for messages
    socket.on("message", (data) => {
      setMessages(data);
    });
    //initializes the first call to grab data from DB, by making the message "", it will not be added to DB
    socket.emit("message", "");
  }, []);

  return (
    <div id="scrollBox" className={styles.all}>
      <Container className={styles.mainContainer}>
        {messages.map((message) => {
          if (message.username === currentUser.username) {
            return (
              <ChatBubble
                key={message._id}
                variant="sender"
                text={message.text}
                username={message.username}
              />
            );
          } else {
            return (
              <ChatBubble
                key={message._id}
                variant="receiver"
                text={message.text}
                username={message.username}
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
            username: currentUser.username,
            userId: currentUser._id,
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

export default ChatBox;
