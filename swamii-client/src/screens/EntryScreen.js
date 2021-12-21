import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import styles from "../css/cssScreens/entry-screen.module.css";

import logo from "../assets/logos/gray-logo.png";
import AppText from "../components/generic/AppText";
import AppButton from "../components/generic/AppButton";

function EntryScreen(props) {
  const navigate = useNavigate();
  return (
    <Container className={styles.mainContainer}>
      <Container className={styles.logoContainer}>
        <img src={logo} className={styles.logo} alt="Logo-pic" />
      </Container>
      <Container className={styles.buttonContainer}>
        <Container className={styles.button}>
          <AppButton title="Log In" onClick={() => navigate("/login")} />
        </Container>
        <Container className={styles.button}>
          <AppButton title="Register to Play" onClick={() => navigate("/register")} />
        </Container>
      </Container>
        <Container className={styles.button}>
          <AppButton title="Admin Log In" onClick={() => navigate("/admin/login")} />
        </Container>
    </Container>
  );
}

export default EntryScreen;
