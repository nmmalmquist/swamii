import React, { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import styles from "../css/cssComponents/navbar.module.css";

import logo from "../assets/logos/blue-logo.png";
import AuthContext from "../auth/context";
import NeonLogo from "../components/NeonLogo";

function MyNavbar(props) {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogout = () => {
    window.localStorage.removeItem("swamiiUserAuthToken");
    setUser(null);
    console.log("logged out");
    navigate("/entry");
  };

  return (
    <Navbar variant="dark" expand="md" style={{ padding: 0 }}>
      <Container className={styles.container}>
        <div className={styles.logo}>
          <NeonLogo backgroundColor="black" fontSize={45} />
        </div>
        <div className={styles.leftLinksGroup}>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <h6 onClick={() => navigate("/entry")} className={styles.links}>
                Welcome
              </h6>
              <h6 onClick={() => navigate("/")} className={styles.links}>
                Dashboard
              </h6>
            </Nav>
          </Navbar.Collapse>
        </div>
        <div className={styles.secondContainer}>
          <div className={styles.rightLinksGroup}>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <h6
                  onClick={() => navigate("/profile")}
                  className={styles.links}
                >
                  Profile
                </h6>
                <h6 onClick={handleLogout} className={styles.links}>
                  Logout
                </h6>
              </Nav>
            </Navbar.Collapse>
          </div>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggleBtn} />
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
