import React from "react";
import { Container } from "react-bootstrap";

import styles from "../css/cssScreens/entry-screen.module.css";

import logo from "../assets/logos/gray-logo.png";
import AppText from "../components/generic/AppText";
import AppButton from "../components/generic/AppButton";

function EntryScreen(props) {
  return (
    <Container className={styles.mainContainer}>
      <Container className={styles.logoContainer}>
        <img src={logo} className={styles.logo} alt="Logo-pic" />
      </Container>
      <Container className={styles.buttonContainer}>
        <Container className={styles.button}>
          <AppButton title="Log In" />
        </Container>
        <Container className={styles.button}>
          <AppButton title="Register to Play" />
        </Container>
      </Container>
    </Container>
  );
}

export default EntryScreen;
