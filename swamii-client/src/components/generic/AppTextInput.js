import React from "react";
import { Form } from "react-bootstrap";

import styles from "../../css/cssComponents/app-text-input.module.css";

function AppTextInput({ label, type, placeholder, ...otherTextInputProps }) {
  return (
    <Form.Group className={`${styles.textGroup} mb-3`} >
      <Form.Label className={styles.label}>{label}</Form.Label>
      <Form.Control className={styles.control} type={type} placeholder={placeholder} {...otherTextInputProps} />
    </Form.Group>
  );
}

export default AppTextInput;
