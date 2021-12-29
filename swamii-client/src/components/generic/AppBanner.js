import React from 'react';
import { Container } from 'react-bootstrap';

import styles from "../../css/cssComponents/app-banner.module.css"

function AppBanner({visible, text,primaryColor, secondaryColor}) {
    if(!visible) return null
    window.scrollTo(0, 0)
    return (
        <Container style={{backgroundColor: primaryColor}} className={styles.container}>
            <div style={{backgroundColor: secondaryColor}} className={styles.topHR}/>
            <h3 style={{color: secondaryColor}}>{text}</h3>
            <div style={{backgroundColor: secondaryColor}} className={styles.bottomHR}/>
        </Container>
    );
}

export default AppBanner;