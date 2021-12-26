import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";

import styles from "../css/cssScreens/home-screen.module.css";
import StandingsDisplay from "../components/StandingsDisplay";
import {getAllUsersOrderedByBalance } from "../api/users";

function HomeScreen(props) {
    const [users, setUsers] = useState([]);


    const getData = async() => {
        //returns the data in order of the user's current balance
        const responseData = await getAllUsersOrderedByBalance();
        setUsers(responseData)
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <Container
      fluid
      style={{ paddingLeft: 0, paddingRight: 0 }}
      className={styles.screen}
    >
      <Row className={styles.thisRow}>
        <Col xs={12} md={6}>
          <div className={`${styles.contentContainer} ${styles.paddingContainer}`}>
            <div className={styles.container1}>
              <div className={styles.border}>This weeks games</div>
            </div>
            
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className={`${styles.contentContainer} ${styles.paddingContainer}`}>
            <div className={styles.container2}>
              <div className={styles.border}>Standings</div>
              <div>
                  <StandingsDisplay users={users}/>
              </div>
            </div>
            <div className={styles.container3}>
              <div className={styles.border}>Chat box</div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeScreen;
