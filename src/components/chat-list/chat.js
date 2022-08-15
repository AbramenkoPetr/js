import "./chatList.css"

import React from 'react';
import {List} from "@mui/material";
import {ListItem} from "@mui/material";

const chatListContent = [
  {name: 'Chat1', id: 'Chat1'},
  {name: 'Chat2', id: 'Chat2'},
  {name: 'Chat3', id: 'Chat3'}
]
/*console.log(chatListContent)*/

export const ChatList = () => {
  return <div className="ChatListTtl">ChatList 
  {chatListContent.map((chat) => 
    <List key={chat.id}>
      <ListItem>
        {chat.name }
      </ListItem>
    </List>
  )}
  
  </div>
  
};
