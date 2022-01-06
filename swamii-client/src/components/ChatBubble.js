import React from "react";
import { Container } from "react-bootstrap";

import styles from "../css/cssComponents/chat-bubble.module.css";

function ChatBubble({ text, variant = "receiver", username }) {
  if (variant === "receiver") {
    return (
      <>
        <Container className={styles.username}>{username}</Container>
        <Container className={styles.receiver}>{text}</Container>
      </>
    );
  } else if (variant === "sender") {
    return (
      <>
        <Container className={styles.sender}>{text}</Container>
      </>
    );
  } else {
    return null;
  }
}

export default ChatBubble;
