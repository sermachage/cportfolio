"use client";

import { Heart, Coffee, ArrowUp } from "lucide-react";
import { SiBluesky, SiGithub, SiX, SiGmail } from '@icons-pack/react-simple-icons';
import { AiFillLinkedin } from "react-icons/ai";
import { Montserrat } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"] });

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: SiGithub,
    href: "https://github.com/sermachage",
    label: "GitHub",
  },
  {
    icon: SiX,
    href: "https://twitter.com/sermachage",
    label: "Twitter",
  },
  {
    icon: AiFillLinkedin,
    href: "https://www.linkedin.com/in/mikemachage/",
    label: "LinkedIn",
  },
  {
    icon: SiGmail,
    href: "mailto:mikemachage@gmail.com",
    label: "Email",
  },
  {
    icon: SiBluesky,
    href: "https://bsky.app/profile/sermachage.bsky.social",
    label: "Bluesky",
  },
];

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative bg-gray-950 border-t border-gray-800 ${montserrat.className}`}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-20 2xl:px-32 py-16 lg:py-20">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-6">
            <Link
              href="#home"
              scroll={true}
              className="inline-block group"
            >
              <span className="text-2xl font-semibold text-white tracking-tight">
                mike
                <span className="text-green-400 transition-all duration-300 group-hover:text-green-300">@</span>
                <span className="text-gray-400 transition-all duration-300 group-hover:text-white">portfolio</span>
              </span>
            </Link>
            <p className="text-base text-gray-400 leading-relaxed max-w-md">
              Software Engineer specializing in cloud-native applications, microservices & distributed systems
            </p>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <span className="text-sm text-gray-500">Available for work</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-sm uppercase tracking-[0.2em] text-gray-500 font-semibold">
              Quick Links
            </h3>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  scroll={true}
                  className="block text-base text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform"
                >
                  → {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-sm uppercase tracking-[0.2em] text-gray-500 font-semibold">
              Connect
            </h3>
            <div className="space-y-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-base text-gray-400 hover:text-green-400 transition-all duration-300"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-900/50 border border-gray-800 rounded-lg transition-all duration-300 group-hover:border-green-400 group-hover:bg-gray-900">
                    <social.icon className="w-5 h-5" />
                  </div>
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-800 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright */}
          <div className="text-sm text-gray-500">
            © {currentYear} Mike Machage. All rights reserved.
          </div>
          
          {/* Made with love */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-green-400 fill-green-400 animate-pulse" />
            <span>&</span>
            <Coffee className="w-4 h-4 text-green-400" />
            <span>in Nairobi</span>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-sm text-gray-400 hover:text-green-400 hover:border-green-400 transition-all duration-300 hover:-translate-y-1"
            aria-label="Scroll to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}