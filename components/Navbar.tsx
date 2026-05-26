"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Montserrat } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"] });

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    navItems.forEach(({ href }) => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${montserrat.className} ${
        isScrolled
          ? "bg-gray-950/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-gray-800/50"
          : "bg-gray-950/80 backdrop-blur-sm border-b border-gray-900"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-20 2xl:px-32">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link
            href="#home"
            scroll={true}
            className="relative group"
          >
            <span className="text-xl font-semibold text-white tracking-tight">
              mike
              <span className="text-green-400 transition-all duration-300 group-hover:text-green-300">@</span>
              <span className="text-gray-400 transition-all duration-300 group-hover:text-white">portfolio</span>
            </span>
            {/* Underline effect */}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-2">
            {navItems.map(({ href, label }) => {
              const isActive = activeSection === href.replace("#", "");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    scroll={true}
                    className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg group ${
                      isActive
                        ? "text-green-400"
                        : "text-gray-400 hover:text-white hover:bg-gray-900/50"
                    }`}
                  >
                    {label}
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full"></span>
                    )}
                    {/* Hover underline */}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-green-400/50 transition-all duration-300 group-hover:w-3/4"></span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link
              href="#contact"
              scroll={true}
              className="px-6 py-2.5 bg-green-400 text-gray-950 text-sm font-semibold rounded-lg transition-all duration-300 hover:bg-green-300 hover:shadow-lg hover:shadow-green-400/20"
            >
              {"Let's Talk"}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative p-2.5 text-gray-400 hover:text-white transition-all duration-200 hover:bg-gray-900/50 rounded-lg"
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5">
              <Menu 
                className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                }`} 
              />
              <X 
                className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                }`} 
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-6 border-t border-gray-800/50">
            <ul className="space-y-1">
              {navItems.map(({ href, label }) => {
                const isActive = activeSection === href.replace("#", "");
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      scroll={true}
                      className={`flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? "text-green-400 bg-gray-900/50 border-l-2 border-green-400"
                          : "text-gray-400 hover:text-white hover:bg-gray-900/30 border-l-2 border-transparent"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{label}</span>
                      {isActive && (
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            {/* Mobile CTA */}
            <div className="mt-6 px-4">
              <Link
                href="#contact"
                scroll={true}
                className="block w-full text-center px-6 py-3.5 bg-green-400 text-gray-950 text-base font-semibold rounded-lg transition-all duration-300 hover:bg-green-300 hover:shadow-lg hover:shadow-green-400/20"
                onClick={() => setIsMenuOpen(false)}
              >
                {"Let's Talk"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;