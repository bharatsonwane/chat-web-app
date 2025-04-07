import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import { createRoutesFromElements, RouterProvider, creaateBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import Store from "./store";

/*const router = creaateBrowserRouter(
  createRoutesFromElements(

  )
);*/

createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <App />
  </Provider>
);
