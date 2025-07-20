// MainRoutes.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PreAuthRoute from "../pages/preAuth";
import PostAuthRoute from "../pages/postAuth";

function MainRoutes({ token }) {
  return (
    <BrowserRouter>
      <Routes>
        {!token && <Route path="/*" element={<PreAuthRoute />} />}
        {token && <Route path="/*" element={<PostAuthRoute />} />}
        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/signin"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
