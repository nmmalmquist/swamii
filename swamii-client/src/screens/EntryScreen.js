import React,{useContext, useState} from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import styles from "../css/cssScreens/entry-screen.module.css";

import logo from "../assets/logos/gray-logo.png";
import AppText from "../components/generic/AppText";
import AppButton from "../components/generic/AppButton";
import AuthContext from "../auth/context"
import AppBanner from "../components/generic/AppBanner";



function EntryScreen(props) {
  const navigate = useNavigate();
  const {user}= useContext(AuthContext);
  const [signedIn, setSignedIn] = useState(true)

  const handleDahsboardButtonClick = () => {
    if (!user) return setSignedIn(false)
    navigate("/")
  }

  return (
    <Container
      fluid
      style={{ paddingLeft: 0, paddingRight: 0 }}
      className={styles.mainContainer}
    >
      <AppBanner visible={!signedIn} text="You must sign in before you can access the dashboard" primaryColor={"red"} secondaryColor={"white"}/>
      <div className={styles.logoContainer}>
        <img src={logo} className={styles.logo} alt="Logo-pic" />
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <AppButton title="Dashboard" onClick={handleDahsboardButtonClick} />
        </div>
        <div className={styles.authButtonContainer}>
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
