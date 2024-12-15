import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import { createRoutesFromElements, RouterProvider, creaateBrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'

/*const router = creaateBrowserRouter(
  createRoutesFromElements(

  )
);*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/*<RouterProvider router={router} /> */}
  </StrictMode>,
)
