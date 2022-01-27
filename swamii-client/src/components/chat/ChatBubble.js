import React from "react";
import { Container } from "react-bootstrap";

import styles from "../../css/cssComponents/chat-bubble.module.css";

function ChatBubble({ text, variant = "receiver", username }) {
  if (variant === "receiver") {
    return (
      <div className={styles.leftContainer}>
        <Container className={styles.username}>{username}</Container>
        <Container>
          <div className={styles.receiver}>
            <span className={styles.text}>{text}</span>
          </div>
        </Container>
      </div>
    );
  } else if (variant === "sender") {
    return (
      <div className={styles.rightContainer}>
        <Container>
          <div className={styles.sender}>
            <span className={styles.text}>{text}</span>
          </div>
        </Container>
      </div>
    );
  } else {
    return null;
  }
}

export default ChatBubble;
