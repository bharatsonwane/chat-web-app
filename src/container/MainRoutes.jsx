import { BrowserRouter, Route, Routes } from "react-router-dom";
import PreAuthRoute from "../pages/preAuth";
import PostAuthRoute from "../pages/postAuth";
import Cookies from "js-cookie";
import { useState } from "react";
import SignIn from "../pages/preAuth/signin/SignIn";

function MainRoutes() {
  const [isLogin, setIsLogin ] = useState(false);
  //const isLogin = true;
  //isLogin = Cookies.get("isLogin");
  return (
    <BrowserRouter>
      {isLogin ? <PostAuthRoute /> : <PreAuthRoute setIsLogin={setIsLogin} />}
    </BrowserRouter>
  );
}

export default MainRoutes;
