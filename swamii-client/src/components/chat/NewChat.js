import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import AuthContext from "../../auth/context";
import ChatContext from "../../chat/context";

import styles from "../../css/cssComponents/new-chat.module.css";
import AppForm from "../form/AppForm";
import FormChatReactSelect from "../form/FormChatReactSelect";
import ChatInput from "./ChatInput";

function NewChat({ allUsers, returnToChatList }) {
  let { socketContext } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const [invalidRecipient, setInvalidRecipient] = useState(false);

  //options for the autocomplete
  let options = [...allUsers.map((thisUser) => {
    return { value: thisUser.username, label: thisUser.username };
  }), { value: "Everyone", label: "Everyone" }];
  options = options.filter((thisUser) => thisUser.label !== user.username);

  const handleSubmitMessage = (newMessage, { resetForm }) => {
    
    if(newMessage.recipient === "" || newMessage.text === "")
    {
      setInvalidRecipient(true)
      return;
    }
    
    socketContext.emit("privateMessage", { message: newMessage, user: user });
    //reset form/message bar
    resetForm({ values: "" });
    returnToChatList();
  };

  const handleModelClose = () => {
    setInvalidRecipient(false)
  }
  return (
    <AppForm
      initialValues={{
        text: "",
        sender: user.username,
        senderId: user._id,
        recipient: "",
        //this is a temporary unique ID for all new messages that get added in a session before the db can create the GUID
        _id: new Date().toString() + Math.random() * 1000,
      }}
      onSubmit={handleSubmitMessage}
    >
      <Container className={styles.mainContainer}>
        <div className={styles.new}>
          <FormChatReactSelect
            options={options}
            placeholder={"To: Username..."}
          />
        </div>
        <div className={styles.subContainer}>
          <div >
            <ChatInput />
          </div>
        </div>
        {invalidRecipient ? <div className={styles.warningModel} onClick={handleModelClose}>
          <h4>Must Input a valid user and provid some text to send</h4>
          <div className={styles.closeModel}>
              Close
          </div>
        </div> : null}
      </Container>
    </AppForm>
  );
}

export default NewChat;
