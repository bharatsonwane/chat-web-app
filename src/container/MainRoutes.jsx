import { BrowserRouter } from "react-router-dom";
import PreAuthRoute from "../pages/preAuth";
import PostAuthRoute from "../pages/postAuth";

function MainRoutes() {
  const isLogin = false;
  return (
    <BrowserRouter>
      {isLogin ? <PostAuthRoute /> : <PreAuthRoute />}
    </BrowserRouter>
  );
}

export default MainRoutes;
