import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ChatList from "./pages/ChatList";
import OneToOneChat from "./pages/OneToOneChat";

const Chat = () => {
  const Location = useLocation();
  return (
    <>
      <Routes>
        <Route
          path={`/`}
          element={<Navigate replace="/" to={`${Location.pathname}/list`} />}
        />
        <Route path="list/" element={<ChatList />} />
        <Route path="oneToOne/:userId" element={<OneToOneChat />} />
      </Routes>
    </>
  );
};
export default Chat;
