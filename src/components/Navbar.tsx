"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { Menu, X, Image, LogOut, UserIcon } from "lucide-react";

interface NavbarProps {
  user: User | null;
  username: string | null;
  onSignOut: () => Promise<void>;
}

const Navbar: React.FC<NavbarProps> = ({ user, username, onSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-pink-500/90 backdrop-blur-md shadow-md text-white"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Image className="h-8 w-8 text-primary" />
              <span
                className={`ml-2 text-xl font-bold ${
                  scrolled
                    ? "text-white"
                    : "bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                }`}
              >
                AI Meme Generator
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-white/20 backdrop-blur-sm">
                  <UserIcon className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    {username}
                  </span>
                </div>
                <button
                  onClick={onSignOut}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 rounded-md bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors shadow-sm border border-white/30"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/20 focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3">
            {user ? (
              <>
                <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-white/20">
                  <UserIcon className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    {username}
                  </span>
                </div>
                <button
                  onClick={() => {
                    onSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-md bg-white/20 text-white hover:bg-white/30 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="block w-full px-3 py-2 rounded-md text-base font-medium bg-white text-indigo-600 hover:bg-white/90 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
