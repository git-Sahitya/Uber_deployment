import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import { ToastContainer } from "react-toastify";
import CaptainContext from "./context/CaptainContext.jsx";
import SocketProvider from './context/SocketContext.jsx'

createRoot(document.getElementById("root")).render(
      <CaptainContext>
    <UserContext>
    <SocketProvider>
    <BrowserRouter>
      <App />
      <ToastContainer/>
    </BrowserRouter>
    </SocketProvider>
    </UserContext>
    </CaptainContext>
);
