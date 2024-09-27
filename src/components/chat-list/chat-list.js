import { List } from "@mui/material";
import {  useState } from "react";
//
import { useParams, NavLink } from "react-router-dom";
//
import { Chat } from "./chat";
import "./chat-list.css"

// @TODO переделать на роутер (использовать NavLink to={`/chat/${chat}`})
export const ChatList = () => {
  const [chatList] = useState(["room1", "room2", "room3"]);
  //
  //const params = useParams();
  //const roomId = params.roomID;
  const { roomId } = useParams();
  //
  //const [selectedRoom, setSeledRoom] = useState("room1");//!

  //const handleListItemClick = useCallback((room) => {//!
  //  setSeledRoom(room);
  //}, []);
  //
  //console.dir(handleListItemClick)
  
  //console.dir(roomId);
  //
  return (
    <List component="nav" className="common">
      {chatList.map((chat) => (

        <NavLink key={`/chat/${chat}`} to={`/chat/${chat}`}>

        <Chat
          key={chat}
          title={chat}
          selected={chat === roomId}//=== roomId   old selectedRoom
          //handleListItemClick={handleListItemClick}//!
        />

        </NavLink>

      ))}
    
    </List>
    
  );
};
