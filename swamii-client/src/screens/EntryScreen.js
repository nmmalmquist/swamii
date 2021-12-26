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
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }} className={styles.mainContainer}>
      <div className={styles.logoContainer}>
        <img src={logo} className={styles.logo} alt="Logo-pic" />
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <AppButton title="Log In" onClick={() => navigate("/login")} />
        </div>
        <div className={styles.button}>
          <AppButton
            title="Register to Play"
            onClick={() => navigate("/register")}
          />
        </div>
      </div>
      <div className={styles.button}>
        <AppButton
          title="Admin Log In"
          onClick={() => navigate("/admin/login")}
        />
      </div>
    </Container>
  );
}

export default EntryScreen;
