import React from "react";
import { Container } from "react-bootstrap";

import styles from "../css/cssScreens/home-screen.module.css";

function HomeScreen(props) {
  return (
    <Container className={styles.screen}>
      <Container className={styles.container1}>
        <div className={styles.title}>This weeks games</div>
      </Container>
      <Container className={styles.medContainer}>
        <Container className={styles.container2}>
          <div className={styles.title}>Standings</div>
        </Container>
        <Container className={styles.container3}>
          <div className={styles.title}>Chat box</div>
        </Container>
      </Container>
    </Container>
  );
}

export default HomeScreen;
