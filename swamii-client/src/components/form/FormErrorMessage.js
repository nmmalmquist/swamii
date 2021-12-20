import React from "react";

import styles from "../../css/cssComponents/cssForm/form-error-message.module.css"

import AppText from "../../components/generic/AppText";

function AppErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <AppText extraStyle={styles.text}>{error}</AppText>;
}

export default AppErrorMessage;