const messagesToChatItem = (messages, currentUser) => {
  let allChatItems = [];
  let userChatItemsCreated = [];
  let userFound = false;

  //sort messages by mosty recent
  messages.sort(function (a, b) {
    return new Date(b.dateTimeCreated) - new Date(a.dateTimeCreated);
  });

  //logic to make sure only on chat item is created for 1 user. so this tracks if one has already been created
  messages.forEach(async (message) => {
    userChatItemsCreated.forEach((createdChatItem) => {
      //checks to see if the two party combo in a message has already been created in a chatListItem
      if (
        (message.sender === createdChatItem.sender &&
          message.recipient === createdChatItem.recipient) ||
        (message.sender === createdChatItem.recipient &&
          message.recipient === createdChatItem.sender) ||
        (message.recipient === "Everyone" &&
          createdChatItem.recipient === "Everyone")
      ) {
        userFound = true;
      }
    });
    if (userFound) {
      userFound = false;
    } else {
      //add to the chatItem Array
     let tempChatItem = {
        _id: message._id,
        sender: message.sender,
        text: message.text,
        recipient: message.recipient,
        dateTimeCreated: message.dateTimeCreated,
      };

      //makes the title of the chatListItem always of the other person you are contacting. i.e you should never see your own username int the title field
      if (
        currentUser.username === tempChatItem.sender ||
        tempChatItem.recipient === "Everyone"
      ) {
        tempChatItem.title = tempChatItem.recipient;
      } else {
        tempChatItem.title = tempChatItem.sender;
      }

      allChatItems.push(tempChatItem);
      userChatItemsCreated.push(tempChatItem);
      userFound = false;
    }
  });
  
  return allChatItems;

};

const chatItemToRoomMessages = (chatItem, messages) => {
  let roomMessages = []


  messages.forEach((message) => {
    if(message.sender === chatItem.sender || message.sender === chatItem.recipient || message.recipient === chatItem.recipient)
    {
      roomMessages.push(message)
    }
  })
  return roomMessages
}

export { messagesToChatItem, chatItemToRoomMessages };
