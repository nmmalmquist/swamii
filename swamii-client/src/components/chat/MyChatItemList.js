import React, { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import "react-chat-elements/dist/main.css";
import { ChatList } from "react-chat-elements";

import styles from "../../css/cssComponents/chat-box.module.css";

import AuthContext from "../../auth/context";
import ChatContext from "../../chat/context";
import { messagesToChatItem } from "../../chat/MessageConverter";

function MyChatListItem({ onListItemClick, allUsers, messages }) {
  const [chatListData, setChatListData] = useState([]);
  let currentUser = useContext(AuthContext).user;

  useEffect(() => {
    setChatListData(messagesToChatItem(messages,currentUser));
  }, [messages,currentUser]);

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
              if (!titleUser) {
                if (chatItemData.title === "Everyone") {
                  thisAvatarURL =
                    "https://cdn1.iconfinder.com/data/icons/developer-set-2/512/multiple-512.png";
                } else {
                  return null;
                }
              } else {
                thisAvatarURL = titleUser.avatarURL;
              }

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
