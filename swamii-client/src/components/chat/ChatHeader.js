import React from 'react';
import { Col, Row } from 'react-bootstrap';

import styles from "../../css/cssComponents/chat-header.module.css"

function ChatHeader({chatItemClicked, onBackClick}) {
    return (
        <div className={styles.mainContainer}>
            <Row className={styles.row}>
                <Col className={styles.back} onClick={onBackClick}>Back</Col>
                <Col className={styles.centerTitle}>{chatItemClicked.title}</Col>
                <Col></Col>
            </Row>
        </div>
    );
}

export default ChatHeader;