import React, { useState, useEffect } from "react";
import { Message } from "./message";

export const MessageList = () => {
  const [messageList, setMessageList] = useState([]);
  const [value, setValue] = useState("");

  const sendMessage = () => {
    if (value) {
      setMessageList([
        ...messageList,
        { author: "User", message: value, date: new Date() },
      ]);
      setValue("");
    }
  };

  const handlePressInput = ({ code }) => {
    //console.log(code)
    if (code === "NumpadEnter") { //если нажата клавиша enter
      sendMessage();              //передать сообщение
    }
  };

  useEffect(() => {
    const lastMessage = messageList[messageList.length - 1];
    let timerId = null;

    if (messageList.length && lastMessage.author === "User") {
      timerId = setTimeout(() => {
        setMessageList([
          ...messageList,
          { author: "Bot", message: "Hello from Bot", date: new Date() },
        ]);
        
      }, 1500);
      //console.log(messageList[messageList.length-1])
      return () => {
        clearInterval(timerId);
      };
    }
  }, [messageList]);

  return (
    <>
      <div>
        {messageList.map((message) => (
          <Message message={message} />
        ))}
      </div>

      <button onClick={sendMessage}>Отправить</button>
      <input
        fullwidth="true"
        placeholder="Введите сообщение..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handlePressInput}
      />
    </>
  );
};
