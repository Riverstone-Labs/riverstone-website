"use client";

import { Linkedin, Mail, MapPin } from "lucide-react";

const footerLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Approach", href: "#approach" },
  { label: "Services", href: "#services" },
  { label: "Results", href: "#social-proof" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Tagline */}
          <div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-2xl font-semibold text-white tracking-tight hover:text-blue-400 transition-colors"
            >
              Riverstone Labs
            </button>
            <p className="text-sm text-gray-500 mt-2">
              AI That Works. Results That Scale.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            <span className="text-sm font-medium text-white mb-2">Quick Links</span>
            {footerLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200 text-left"
              >
                {link.label}
              </button>
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
