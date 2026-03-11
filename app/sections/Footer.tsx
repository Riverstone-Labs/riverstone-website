"use client";

import { Linkedin } from "lucide-react";

const footerLinks = [
  { label: "Approach", href: "#approach" },
  { label: "Proof", href: "#proof" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy", href: "#" },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-[#1a1a1a] border-t border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and Tagline */}
          <div className="text-center md:text-left">
            <a href="#" className="text-2xl font-semibold text-[#f5f5f0] tracking-tight">
              Riverstone
            </a>
            <p className="text-sm text-[#6b6b6b] mt-1">
              We don&apos;t do pilots. We do transformation.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-[#a0a0a0] hover:text-[#f5f5f0] transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b6b6b] hover:text-[#f5f5f0] transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[#333333] text-center">
          <p className="text-sm text-[#6b6b6b]">
            © {new Date().getFullYear()} Riverstone Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
