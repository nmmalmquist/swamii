import React, { useEffect, useState, useRef, useContext } from "react";
import { Container } from "react-bootstrap";
import "react-chat-elements/dist/main.css";
import { ChatList } from "react-chat-elements";
import { useNavigate } from "react-router-dom";

import styles from "../../css/cssComponents/chat-box.module.css";

import AuthContext from "../../auth/context";

import ChatContext from "../../chat/context";

function MyChatListItem({ onListItemClick, allUsers }) {
  let { socket } = useContext(ChatContext);
  let currentUser = useContext(AuthContext).user;

  const [chatListData, setChatListData] = useState([]);

  useEffect(() => {
    //event handler for messages
    socket.on("chatItem", (data) => {
      setChatListData(data);
    });
    //initializes the first call to grab data from DB, by making the message "", it will not be added to DB
    socket.emit("message", { message: "", user: currentUser });

    //on unmounting component, we set state back to null to prevent memory leak
    // return () => {
    //   setAllUsers({}); // This worked for me
    //   setChatListData({})
    // };
  }, [currentUser, socket]);
  return (
    <div id="scrollBox" className={styles.all}>
      <Container className={styles.mainContainer}>
        {chatListData && allUsers
          ? chatListData.map((chatItemData) => {

            //this section checks to see if there is an user for the correspoding list item. if not, then 
              let thisAvatarURL = "";
              const titleUser = allUsers.filter(
                (i) => i.username === chatItemData.title
              )[0];
              if(!titleUser)
              {
                return null;
              }
              thisAvatarURL = titleUser.avatarURL

              return (
                <ChatList
                  key={chatItemData._id}
                  className="chat-item"
                  dataSource={[
                    {
                      avatar: thisAvatarURL,
                      alt: "Avatar",
                      title: chatItemData.title,
                      subtitle: chatItemData.text,
                      date: new Date(chatItemData.dateTimeCreated),
                      unread: 0,
                      sender: chatItemData.sender,
                      recipient: chatItemData.recipient,
                    },
                  ]}
                  onClick={(item) => {
                    onListItemClick(item);
                  }}
                />
              );
            })
          : null}
        {/* <AlwaysScrollToBottom /> */}
      </Container>
    </div>
  );
}

export default MyChatListItem;
