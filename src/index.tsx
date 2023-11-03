import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./globals.css";
import { AuthProvider } from "react-auth-kit";
import { ToasterProvider } from "./Toaster/ToastProvider";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <div className="bg-black">
    <AuthProvider
      authType="cookie"
      authName="auth"
      cookieDomain={window.location.hostname}
      cookieSecure={true}
    >
      <ToasterProvider>
        <App />
      </ToasterProvider>
    </AuthProvider>
  </div>
);
