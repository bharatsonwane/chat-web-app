import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ChatList from "./pages/ChatList";
import OneToOneChat from "./pages/OneToOneChat";

const Chat = () => {
  const location = useLocation();
  return (
    <>
      <Routes>
      <Route
            path={`/`}
            element={<Navigate replace="/" to={`${location.pathname}/list`} />}
          ></Route>
        <Route path="list/" element={<ChatList />} />
        <Route path="oneToOne/*" element={<OneToOneChat />} />
      </Routes>
    </>
  );
};
export default Chat;
