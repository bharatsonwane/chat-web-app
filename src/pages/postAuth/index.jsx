import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "./chat";
import Dashboard from "./Dashboard";
import NavBarPostAuth from "../../components/NavBar/NavBarPostAuth";

function PostAuthRoute() {
  
  return (
    <NavBarPostAuth>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat/*" element={<Chat />} />
        <Route path="*" element={<Navigate replace="/" to={`/`} />} />
      </Routes>
    </NavBarPostAuth>
  );
}

export default PostAuthRoute;
