import React from "react";
import { Routes, Route } from "react-router-dom";

import { PublicHeader } from "./components/PublicHeader";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ExpensesPage from "./pages/ExpensesPage";

function App() {
  return (
    <>
      {/* Public header always visible */}
      <PublicHeader
        onLogin={() => (window.location.href = "/login")}
        onRegister={() => (window.location.href = "/register")}
      />

      {/* Define routes */}
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              onGetStarted={() => (window.location.href = "/register")}
              onLogin={() => (window.location.href = "/login")}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<ExpensesPage />} />
      </Routes>
    </>
  );
}

export default App;
