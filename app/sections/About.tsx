"use client";

import { ScrollReveal } from "../components/ScrollReveal";
import { CheckCircle } from "lucide-react";

const credentials = [
  "Former CTO/VP Engineering at technology companies",
  "Built and scaled engineering teams to 50+",
  "Implemented AI systems across professional services, logistics, and SaaS",
];

export function About() {
  return (
    <section id="about" className="py-24 bg-[#242424]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <ScrollReveal>
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-lg overflow-hidden bg-[#1a1a1a]">
                {/* Placeholder for founder image */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 rounded-full bg-[#4a7c59]/20 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-4xl font-bold text-[#6b9b7a]">WM</span>
                    </div>
                    <p className="text-[#6b6b6b] text-sm">Founder photo placeholder</p>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[#4a7c59]/30 rounded-lg -z-10" />
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal delay={0.2}>
            <div>
              <span className="text-[#6b9b7a] text-sm font-medium tracking-wider uppercase mb-4 block">
                About
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#f5f5f0] mb-6 leading-tight">
                Practitioners, not pitch decks
              </h2>
              <p className="text-lg text-[#a0a0a0] leading-relaxed mb-6">
                Riverstone Labs is led by Warwick McIntosh, who spent 15 years in technology leadership roles before founding the firm. We&apos;ve been operators. We know the difference between a demo and a production system.
              </p>

              {/* Credentials */}
              <div className="space-y-3 mb-8">
                {credentials.map((credential, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#6b9b7a] shrink-0 mt-0.5" />
                    <span className="text-[#a0a0a0]">{credential}</span>
                  </div>
                ))}
              </div>

              {/* Philosophy */}
              <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333333]">
                <p className="text-[#f5f5f0] italic leading-relaxed">
                  &ldquo;We only take work where we can deliver measurable value. If we can&apos;t help, we&apos;ll tell you — and point you to someone who can.&rdquo;
                </p>
                <p className="text-[#6b9b7a] mt-4 font-medium">
                  — Warwick McIntosh, Founder
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
