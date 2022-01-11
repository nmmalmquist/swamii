import React, { useEffect, useState, useRef, useContext } from "react";
import { Container } from "react-bootstrap";

import styles from "../css/cssComponents/chat-box.module.css";
import ChatBubble from "./ChatBubble";
import AppTextInput from "./generic/AppTextInput";
import AppForm from "./form/AppForm";
import SubmitFormButton from "./form/SubmitFormButton";
import FormTextInput from "./form/FormTextInput";
import AuthContext from "../auth/context";


function ChatBox(props) {
  let currentUser = useContext(AuthContext).user.username
  console.log(currentUser)
  const [messages, setMessages] = useState([
    {
      username: "user",
      id: 1,
      dateTimeSent: "02/22/2022 12:00pm",
      message: "Hello, Nick",
    },
    {
      username: "jmalm",
      id: 1,
      dateTimeSent: "02/22/2022 12:00pm",
      message: "Hello, Nick",
    },
    {
      username: "user",
      id: 1,
      dateTimeSent: "02/22/2022 12:00pm",
      message: "Hello, Nick",
    },
    {
      username: "jmalm",
      id: 1,
      dateTimeSent: "02/22/2022 12:00pm",
      message: "Hello, Nick",
    },
    {
      username: "user",
      id: 1,
      dateTimeSent: "02/22/2022 12:00pm",
      message: "Hello, Nick",
    },
    {
      username: "jmalm",
      id: 1,
      dateTimeSent: "02/22/2022 12:00pm",
      message: "Hello, Nick",
    },
    {
      username: "user",
      id: 1,
      dateTimeSent: "02/22/2022 12:00pm",
      message: "Hello, Nick",
    },
    {
      username: "jmalm",
      id: 1,
      dateTimeSent: "02/22/2022 12:00pm",
      message: "Hello, Nick",
    },
    {
      username: "user",
      id: 1,
      dateTimeSent: "02/22/2022 12:00pm",
      message: "Hello, Nick",
    },
    {
      username: "jmalm",
      id: 1,
      dateTimeSent: "02/22/2022 12:00pm",
      message: "Hello, Nick",
    },
    {
      username: "user",
      id: 1,
      dateTimeSent: "02/22/2022 12:00pm",
      message: "Hello, Nick",
    },
    {
      username: "jmalm",
      id: 1,
      dateTimeSent: "02/22/2022 12:00pm",
      message: "Hello, Nick",
    },
    {
      username: "user",
      id: 1,
      dateTimeSent: "02/22/2022 12:00pm",
      message: "Hello, Nick",
    },
    {
      username: "jmalm",
      id: 1,
      dateTimeSent: "02/22/2022 12:00pm",
      message: "Hello, Nick",
    },
    {
      username: "user",
      id: 1,
      dateTimeSent: "02/22/2022 12:00pm",
      message: "Hello, Nick",
    },
    {
      username: "jmalm",
      id: 1,
      dateTimeSent: "02/22/2022 12:00pm",
      message: "Hello, Nick",
    },
  ]);

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  const handleSubmit = (newMessage) => {
    if (newMessage.message === "") return;
    console.log("new message: " + newMessage.message);
    setMessages([...messages, newMessage]);
  };

  return (
    <div id="scrollBox" className={styles.all}>
      <Container className={styles.mainContainer}>
        {messages.map((message) => {
          if (message.username === currentUser) {
            return (
              <ChatBubble
                variant="sender"
                text={message.message}
                username={message.username}
              />
            );
          } else {
            return (
              <ChatBubble
                variant="receiver"
                text={message.message}
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
            message: "",
            username: currentUser,
            dateTimeSent: Date.now(),
            id: 1,
          }}
          onSubmit={handleSubmit}
        >
          <div className={styles.messageBar}>
            <FormTextInput placeholder="message" type="text" name="message" />
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
