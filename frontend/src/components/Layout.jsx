import React from "react";
import { PublicHeader } from "./PublicHeader";
import { Footer } from "./Footer"; // we'll make Footer.jsx too

export function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <PublicHeader
        onLogin={() => (window.location.href = "/login")}
        onRegister={() => (window.location.href = "/register")}
      />

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
