"use client";

import { ScrollReveal } from "../components/ScrollReveal";
import { X, Check } from "lucide-react";

const problemPoints = [
  "Pilots that never scale",
  "Vendors who disappear after implementation",
  "Teams left without the skills to maintain systems",
  "No measurable business impact",
];

const solutionPoints = [
  "Selective engagement (we say no more than yes)",
  "Embedded practitioners, not remote consultants",
  "Knowledge transfer as core deliverable",
  "Measurable outcomes, not vanity metrics",
];

export function Problem() {
  return (
    <section id="problem" className="py-24 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* The Problem */}
          <ScrollReveal>
            <div className="h-full">
              <span className="text-[#6b6b6b] text-sm font-medium tracking-wider uppercase mb-4 block">
                The Problem
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#f5f5f0] mb-6 leading-tight">
                Most AI projects fail before they start
              </h2>
              <p className="text-lg text-[#a0a0a0] leading-relaxed mb-8">
                The industry is obsessed with &quot;pilot projects&quot; — small experiments that prove nothing, change nothing, and waste six months. By the time the pilot ends, the team has moved on, the budget is gone, and you&apos;re back where you started.
              </p>
              
              <ul className="space-y-4">
                {problemPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-red-400" />
                    </div>
                    <span className="text-[#a0a0a0]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Our Solution */}
          <ScrollReveal delay={0.2}>
            <div className="h-full bg-[#242424] rounded-lg p-8 border border-[#333333]">
              <span className="text-[#6b9b7a] text-sm font-medium tracking-wider uppercase mb-4 block">
                Our Solution
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#f5f5f0] mb-6 leading-tight">
                We embed for lasting change
              </h2>
              <p className="text-lg text-[#a0a0a0] leading-relaxed mb-8">
                We work alongside your team, build systems that integrate with your operations, and transfer the knowledge so you own the capability. When we leave, you keep the value.
              </p>
              
              <ul className="space-y-4">
                {solutionPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#4a7c59]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#6b9b7a]" />
                    </div>
                    <span className="text-[#f5f5f0]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
