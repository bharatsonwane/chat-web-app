import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./signin/SignIn";
import SignUp from "./signup/SignUp";
import NavBarPreAuth from "../../components/NavBar/NavBarPreAuth";

function PreAuthRoute() {
  return (
    <NavBarPreAuth>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate replace="/" to={`/`} />} />
      </Routes>
    </NavBarPreAuth>
  );
}

export default PreAuthRoute;
