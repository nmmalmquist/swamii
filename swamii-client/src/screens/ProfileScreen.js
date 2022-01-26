import React from "react";

import styles from "../css/cssScreens/profile-screen.module.css";

import MyNavbar from "../components/MyNavbar";
import AppButton from "../components/generic/AppButton";


function ProfileScreen(props) {
  return (
    <>
      <MyNavbar />
      <AppButton title="title button" extraStyle={styles.appButton}/>
      <div className={styles.parentDiv}>

        <div className={styles.buttonStyle}></div>
        <div className={styles.buttonTwo}></div>
        <div className={styles.buttonThree}></div>
      </div>


    </>


  );
}

export default ProfileScreen;
