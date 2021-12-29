import React from "react";
import Lottie from "lottie-react";

import styles from "../css/cssComponents/standings-display.module.css";

import loadingAnimation from "../assets/animations/loadingSquare.json";

//users should be an array of objects
function StandingsDisplay({ users }) {
  if (users === null)
    return (
      <div className={styles.lottieContainer}>
        <Lottie animationData={loadingAnimation} className={styles.lottie} />
      </div>
    );

  const handleMaping = (item, index) => {
    if (typeof item == "object") {
      return (
        <div key={item.username}>{`${index + 1})   ${item.username}: $${
          item.currentBalance
        }`}</div>
      );
    }
    return <div>{item}</div>;
  };

  return <div>{users.map((item, index) => handleMaping(item, index))}</div>;
}

export default StandingsDisplay;
