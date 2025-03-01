// components/Navigation.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart3, Map, LineChart, ExternalLink, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <LineChart className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                LafeAINet-Dashboard
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Network Statistics
              </Link>

              <Link
                href="/map"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <Map className="h-4 w-4" />
                Coverage Map
              </Link>

              <Link
                href="https://netrep-tls.vercel.app/"
                target="_blank"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                Submit Report
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Network Statistics
              </div>
            </Link>

            <Link
              href="/map"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                Coverage Map
              </div>
            </Link>

            <Link
              href="https://netrep-tls.vercel.app/"
              target="_blank"
              className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                Submit Report
                <ExternalLink className="h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
