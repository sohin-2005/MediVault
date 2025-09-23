import React, { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useLocation } from 'react-router-dom';

export function PublicHeader({ onLogin, onRegister }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Detect if we are on landing page or not
  const isLandingPage = location.pathname === "/";

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Security', href: '#security' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isLandingPage
          ? "bg-white/10 backdrop-blur-md border-b border-white/20 text-white"
          : "bg-white shadow-md text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div
              className={`p-2 rounded-lg ${
                isLandingPage ? "bg-white/20" : "bg-blue-100"
              }`}
            >
              <Heart
                className={`h-6 w-6 ${
                  isLandingPage ? "text-white" : "text-blue-600"
                }`}
              />
            </div>
            <span
              className={`text-xl font-bold ${
                isLandingPage ? "text-white" : "text-gray-900"
              }`}
            >
              MediVault
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`transition-colors duration-200 ${
                  isLandingPage
                    ? "text-white/90 hover:text-white"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              className={`${
                isLandingPage
                  ? "text-white hover:bg-white/10"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={onLogin}
            >
              Sign In
            </Button>
            <Button
              className={`${
                isLandingPage
                  ? "bg-white text-blue-600 hover:bg-blue-50"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={onRegister}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
