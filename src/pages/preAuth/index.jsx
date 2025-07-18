import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./signin/SignIn";
import SignUp from "./signup/SignUp";
import About from "./about/About";
import NavBarPreAuth from "../../components/NavBar/NavBarPreAuth";
import Update from "./update/Update";

function PreAuthRoute({setIsLogin}) {
  return (
    <NavBarPreAuth>
      <Routes>
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/updates" element={<Update />} />
        <Route path="*" element={<Navigate replace="/" to={`/`} />} />
      </Routes>
    </NavBarPreAuth>
  );
}

export default PreAuthRoute;
