"use client";

import { Linkedin, Mail, MapPin } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Tagline */}
          <div>
            <Link href="/" className="text-2xl font-semibold text-white tracking-tight">
              Riverstone Labs
            </Link>
            <p className="text-sm text-gray-500 mt-2">
              AI That Works. Results That Scale.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            <span className="text-sm font-medium text-white mb-2">Quick Links</span>
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact Info */}
          <div>
            <span className="text-sm font-medium text-white mb-2 block">Contact</span>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Brisbane, Australia</span>
              </div>
              <a 
                href="mailto:hello@riverstonelabs.com.au"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                <span>hello@riverstonelabs.com.au</span>
              </a>
            </div>
            
            {/* Social */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            &copy; 2026 Riverstone Labs Pty Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
