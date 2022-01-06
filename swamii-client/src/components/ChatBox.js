import React, { useState } from "react";
import { Container } from "react-bootstrap";

import styles from "../css/cssComponents/chat-box.module.css";
import ChatBubble from "./ChatBubble";

const currentUser = "nmmalmquist";

function ChatBox(props) {
  const [messages, setMessages] = useState([
    
    {
      username: "nmmalmquist",
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
      username: "nmmalmquist",
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
      username: "nmmalmquist",
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
      username: "nmmalmquist",
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
      username: "nmmalmquist",
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
      username: "nmmalmquist",
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
      username: "nmmalmquist",
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
      username: "nmmalmquist",
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
  return (
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
    </Container>
  );
}

export default ChatBox;
