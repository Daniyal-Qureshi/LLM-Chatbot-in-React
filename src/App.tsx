// App.js

import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { RequireAuth, useIsAuthenticated } from 'react-auth-kit';
import LoginComponent from './components/Login';
import SignupComponent from './components/Signup/index';
import HomeComponent from './components/Home';
import Dataset from './components/Dataset';

function App() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signin"
          element={isAuthenticated() ? <Navigate to="/" /> : <LoginComponent />}
        />
        <Route
          path="/signup"
          element={
            isAuthenticated() ? <Navigate to="/" /> : <SignupComponent />
          }
        />
        <Route
          path="/"
          element={(
            <RequireAuth loginPath="/signin">
              <HomeComponent />
            </RequireAuth>
          )}
        />
        <Route
          path="/dataset"
          element={(
            <RequireAuth loginPath="/signin">
              <Dataset />
            </RequireAuth>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
