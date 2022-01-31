import React from "react";
import { Col, Row } from "react-bootstrap";

import styles from "../../css/cssComponents/chat-header.module.css";

function ChatHeader({
  chatItemClicked,
  onBackClick,
  onNewChatClick,
  newChatIconVisible,
}) {
  if (chatItemClicked) {
    return (
      <div className={styles.mainContainer}>
        <Row className={styles.row}>
          <Col className={styles.leftCol} onClick={onBackClick}>
            <span className={styles.back}>
              <i class={`fas fa-chevron-left fa-lg ${styles.back}`}></i>
            </span>
          </Col>
          <Col className={styles.centerCol}>
            <img
              className={styles.avatar}
              src={chatItemClicked.avatar}
              alt="avatar"
            />
            <span>{chatItemClicked.title}</span>
          </Col>
          <Col></Col>
        </Row>
      </div>
    );
  } else {
    return (
      <div className={styles.mainContainer}>
        <Row className={styles.row}>
          <Col className={styles.leftCol} onClick={onBackClick}>
            {!newChatIconVisible ? (
              <i class={`fas fa-chevron-left fa-lg ${styles.back}`}></i>
            ) : null}
          </Col>
          <Col className={styles.centerTitle}>Messages</Col>
          <Col className={styles.rightCol}>
            {newChatIconVisible ? (
              <i
                onClick={onNewChatClick}
                className={`far fa-plus-square fa-lg ${styles.rightIcon}`}
              ></i>
            ) : null}
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChatHeader;
