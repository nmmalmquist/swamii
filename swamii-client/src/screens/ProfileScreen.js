import React from "react";

import styles from "../css/cssScreens/profile-screen.module.css";

import MyNavbar from "../components/MyNavbar";
import AppButton from "../components/generic/AppButton";
import { Col } from "react-bootstrap";

function ProfileScreen(props) {
  return (
    <>
      <MyNavbar />
      <AppButton title="title button" extraStyle={styles.appButton} />
      <div class="container">
        <div class="row align-items-start">
          <div className={styles.previousPicks}>Previous Picks</div>

          <div className={styles.currentPlace}>
            userName is currently in 4th Place
          </div>
          <Col xs={12} md={6}>
            <div className={styles.currentPicks}>Week 8 Picks</div>
          </Col>
        </div>
      </div>
    </>
  );
}

export default ProfileScreen;
