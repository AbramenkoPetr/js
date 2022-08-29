import { Routes, Route, /*useParams, /*NavLink*/ } from "react-router-dom";
import { MessageList, Layout, ChatList } from "../components";

export const ChatPage = () => {
  //
  //const params = useParams();
  //console.log(params);
  //const [room] = Object.values(useParams());
  //console.log(room);
  //
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              messages={<h1 style={{ color: "#fff" }}>Выберите чат</h1>}
              chats={<ChatList />}
            />
          }
        />
        <Route
          path=":roomId"
          element={<Layout messages={<MessageList />} chats={<ChatList />} />}
        /> 
      </Routes>
    </>
  );
};
