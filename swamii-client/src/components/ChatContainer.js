import React, { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";

import ChatContext from '../chat/context';
import MyChatBox from './MyChatBox';
import MyChatListItem from './MyChatItemList';

function ChatContainer(props) {
    const BASE_URL = "10.225.146.61:5556";
    const [chatListVisible, setChatListVisible] = useState(true)
    const [socket, setSocket] = useState(null)
    const [chatItemClicked, setChatItemClicked] = useState(null)

    const onListItemClick = (item) => {
        setChatListVisible(false)
        setChatItemClicked(item)   
    }

    useEffect(()=>{
        setSocket(socketIOClient(BASE_URL))
    },[])

    return (
        <ChatContext.Provider value={{socket}}>

        <div>
            {chatListVisible && socket ? <MyChatListItem onListItemClick={onListItemClick}/> : null}
            {!chatListVisible && socket && chatItemClicked ? <MyChatBox chatItemClicked={chatItemClicked}/> : null}
        </div>
        </ChatContext.Provider>
    );
}

export default ChatContainer;