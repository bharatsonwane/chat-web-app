import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PreAuthRoute from "../pages/preAuth";
import PostAuthRoute from "../pages/postAuth";
import Cookies from "js-cookie";
import SignIn from "../pages/preAuth/signin/SignIn";

function MainRoutes() {
  const token = Cookies.get("token");
  console.log(token);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {!token && (
          <Route path="/*" element={<PreAuthRoute />} />
        )}

        {/* Protected Routes */}
        {token && (
          <Route path="/*" element={<PostAuthRoute />} />
        )}

        {/* Fallback: if route not found, redirect */}
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/signin"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
