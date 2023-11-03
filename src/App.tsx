// App.js

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./components/Login";
import SignupComponent from "./components/Signup/index";
import Home from "./components/Home";
import { RequireAuth, useIsAuthenticated } from "react-auth-kit";
import Dataset from "./components/Dataset";

function App() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signin"
          element={isAuthenticated() ? <Navigate to="/" /> : <LoginComponent />}
        ></Route>
        <Route
          path="/signup"
          element={
            isAuthenticated() ? <Navigate to="/" /> : <SignupComponent />
          }
        ></Route>
        <Route
          path="/"
          element={
            <RequireAuth loginPath="/signin">
              <Home />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/dataset"
          element={
            <RequireAuth loginPath="/signin">
              <Dataset />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
