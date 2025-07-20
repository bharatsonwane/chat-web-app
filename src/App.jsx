// App.jsx
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import MainRoutes from "./container/MainRoutes";

function App() {
  const [token, setToken] = useState(Cookies.get("token"));

  // Watch for changes in cookie manually
  useEffect(() => {
    const interval = setInterval(() => {
      const currentToken = Cookies.get("token");
      if (token !== currentToken) {
        setToken(currentToken);
      }
    }, 500); // check every 500ms

    return () => clearInterval(interval);
  }, [token]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MainRoutes token={token} />;
    </div>
  );
}

export default App;
