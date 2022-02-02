import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import AuthContext from "../../auth/context";
import ChatContext from "../../chat/context";

import styles from "../../css/cssComponents/new-chat.module.css";
import AppForm from "../form/AppForm";
import FormChatReactSelect from "../form/FormChatReactSelect";
import ChatInput from "./ChatInput";

function NewChat({ allUsers }) {
  let { socket } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  //options for the autocomplete
  let options = allUsers.map((thisUser) => {
    return { value: thisUser.username, label: thisUser.username };
  });
  options = options.filter((thisUser) => thisUser.label !== user.username);

  const handleSubmitMessage = (newMessage, { resetForm }) => {
    console.log(newMessage);
    if (newMessage.text === "") return;
    socket.emit("message", { message: newMessage, user: user });
    //reset form/message bar
    resetForm({ values: "" });
  };
  return (
    <Container className={styles.mainContainer}>
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
        <div className={styles.new}>
          <FormChatReactSelect
            options={options}
            placeholder={"To: Username..."}
          />
        </div>
        <ChatInput />
      </AppForm>
    </Container>
  );
}

export default NewChat;
