import React from "react";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <Heart className="h-6 w-6 text-blue-400 mr-2" />
          <span className="text-lg font-bold">MediVault</span>
        </div>
        <p className="text-gray-400">
          © {new Date().getFullYear()} MediVault. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
