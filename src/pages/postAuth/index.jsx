import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Chat from "./chat";
import Dashboard from "./Dashboard";
import NavBarPostAuth from "../../components/NavBar/NavBarPostAuth";
import Profile from "./Profile";
import UpdatePassword from "./UpdatePassword";
import Signout from "./Signout";
import Cookies from "js-cookie";
import { useEffect } from "react";

function PostAuthRoute() {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 to react to route changes

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/signin", { replace: true });
    }
  }, [location.pathname]); // 👈 re-run on every route change

  return (
    <NavBarPostAuth>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat/*" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signout" element={<Signout />} />
        <Route path="*" element={<Navigate replace="/" to={`/dashboard`} />} />
      </Routes>
    </NavBarPostAuth>
  );
}

export default PostAuthRoute;
