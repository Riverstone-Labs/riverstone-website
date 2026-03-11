"use client";

import { Separator } from "@/components/ui/separator";
import { ArrowUp, Linkedin, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  services: [
    { label: "AI Strategy", href: "#" },
    { label: "LLM Development", href: "#" },
    { label: "RAG Systems", href: "#" },
    { label: "Agentic AI", href: "#" },
    { label: "MLOps", href: "#" },
    { label: "Training", href: "#" },
  ],
  company: [
    { label: "About", href: "#about" },
    { label: "Case Studies", href: "#proof" },
    { label: "Blog", href: "#content" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#cta" },
  ],
  connect: [
    { label: "LinkedIn", href: "#", icon: Linkedin },
    { label: "Twitter", href: "#", icon: Twitter },
    { label: "YouTube", href: "#", icon: Youtube },
  ],
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a0a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#f59e0b] flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-white">
                Riverstone Labs
              </span>
            </div>
            <p className="text-sm text-[#71717a] leading-relaxed mb-6">
              Premium AI consultancy delivering production-ready systems that
              drive real business results.
            </p>
            <div className="flex gap-3">
              {footerLinks.connect.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-10 h-10 rounded-full bg-[#12121a] border border-white/10 flex items-center justify-center text-[#71717a] hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-colors duration-300"
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#71717a] hover:text-[#00d4ff] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#71717a] hover:text-[#00d4ff] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm text-[#71717a]">
              <p>
                <span className="text-white">Email:</span>
                <br />
                hello@riverstone.ai
              </p>
              <p>
                <span className="text-white">Location:</span>
                <br />
                San Francisco, CA
              </p>
              <p>
                <span className="text-white">Availability:</span>
                <br />
                Limited engagements only
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/5" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#71717a]">
            © {new Date().getFullYear()} Riverstone Labs. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-[#71717a] hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-[#71717a] hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-[#12121a] border border-white/10 flex items-center justify-center text-[#71717a] hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-colors duration-300"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
