import React, { useEffect } from "react";
import { useFormik } from "formik";

import styles from "../../css/cssComponents/chat-box.module.css";
import AppForm from "../form/AppForm";
import FormTextInput from "../form/FormTextInput";
import SubmitFormButton from "../form/SubmitFormButton";

function ChatInput() {
 


    
  return (
    <div className={styles.textInput}>
     
        <form className={styles.bottomSection}>
          <div className={styles.messageBar}>
            <FormTextInput placeholder="message" type="text" name="text" />
          </div>
          <div className={styles.buttonContainer}>
            <SubmitFormButton extraStyle={styles.submitButton} title="Send" />
          </div>
        </form>
      
    </div>
  );
}

export default ChatInput;
