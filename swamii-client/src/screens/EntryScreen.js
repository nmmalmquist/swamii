import React,{useContext, useState, useEffect} from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import styles from "../css/cssScreens/entry-screen.module.css";

import logo from "../assets/logos/gray-logo.png";
import AppText from "../components/generic/AppText";
import AppButton from "../components/generic/AppButton";
import AuthContext from "../auth/context"
import AppBanner from "../components/generic/AppBanner";
import NeonLogo from "../components/NeonLogo";



function EntryScreen(props) {
  const navigate = useNavigate();
  const {user}= useContext(AuthContext);
  const [signedIn, setSignedIn] = useState(true)
  const [logoSize, setLogoSize] = useState("14vw")

  const handleDahsboardButtonClick = () => {
    if (!user) return setSignedIn(false)
    navigate("/")
  }

  useEffect(()=>{
    const screenWidth = window.innerWidth;
    if(screenWidth > 1200){
      setLogoSize("12vw")
    }else if (800 < screenWidth < 1199){
      setLogoSize("20vw")
    }else{
      setLogoSize("18vw")
    }
  },[])

  return (
    <Container
      fluid
      style={{ paddingLeft: 0, paddingRight: 0 }}
      className={styles.mainContainer}
    >
      <AppBanner visible={!signedIn} text="You must sign in before you can access the dashboard" primaryColor={"red"} secondaryColor={"white"}/>
      <div className={styles.logoContainer}>
        <NeonLogo backgroundColor={"black"} fontSize={logoSize}/>
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
