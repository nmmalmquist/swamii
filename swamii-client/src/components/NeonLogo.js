import React from "react";

import styles from "../css/cssComponents/neon-logo.module.css";

function NeonLogo({backgroundColor, fontSize}) {
  return (
      <div className={styles.wrapper}>
        <span style={{fontSize: fontSize}} className={styles.text}>Swamii</span>
        <span className={styles.gradient}></span>
        <span className={styles.dodge}></span>
        <span style={{background: backgroundColor}} className={styles.colorCover}></span>
      </div>
  );
}

export default NeonLogo;
