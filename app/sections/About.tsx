"use client";

import { ScrollReveal } from "../components/ScrollReveal";
import { CheckCircle, MapPin, Target, Users, TrendingUp } from "lucide-react";

const credentials = [
  "Former CTO with 15+ years building software and AI systems",
  "Led engineering teams at scale — from startups to enterprise",
  "Delivered AI implementations across finance, logistics, and professional services",
];

const differentiators = [
  {
    icon: Target,
    title: "We Build, Not Just Advise",
    description: "Most consultants give you a PDF and leave. We stay until AI is actually working in your business.",
  },
  {
    icon: Users,
    title: "Results-Focused, Not Just Tech-Focused",
    description: "We measure ROI in revenue, efficiency, and growth — not just technical metrics.",
  },
  {
    icon: MapPin,
    title: "Brisbane-Based, Australia-Wide",
    description: "Local expertise with national reach. We understand the Australian business landscape.",
  },
  {
    icon: TrendingUp,
    title: "We Measure What Matters",
    description: "Focus on ROI tracking and business outcomes, not vanity metrics. Every project has clear success criteria.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-[#3b82f6] text-sm font-medium tracking-wider uppercase mb-4 block">
            Why Riverstone Labs?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            We Deliver What Others Promise
          </h2>
        </ScrollReveal>

        {/* Founder Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Content */}
          <ScrollReveal>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-tight">
                From CTO to AI Implementation Partner
              </h3>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                Riverstone Labs was founded by Warwick McIntosh after 15 years in technology leadership. Having built and scaled engineering teams, implemented AI systems, and watched countless &quot;AI strategies&quot; fail to deliver, he saw a gap in the market.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                Generic AI training firms promise transformation but deliver PowerPoints. We do the opposite — we build working systems, measure real results, and stay until your team can run everything independently.
              </p>

              {/* Credentials */}
              <div className="space-y-3 mb-8">
                {credentials.map((credential, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#3b82f6] shrink-0 mt-0.5" />
                    <span className="text-gray-300">{credential}</span>
                  </div>
                ))}
              </div>

              {/* Philosophy */}
              <div className="bg-[#0a0a0a] rounded-lg p-6 border border-gray-800">
                <p className="text-white italic leading-relaxed">
                  &ldquo;We exist because most AI consultancies don&apos;t actually build anything. We&apos;re here to change that — one working system at a time.&rdquo;
                </p>
                <p className="text-[#3b82f6] mt-4 font-medium">
                  — Warwick McIntosh, Founder
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Image/Visual */}
          <ScrollReveal delay={0.2}>
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-[#0a0a0a] border border-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 rounded-full bg-[#3b82f6]/20 mx-auto mb-4 flex items-center justify-center border border-[#3b82f6]/30">
                      <span className="text-4xl font-bold text-[#3b82f6]">WM</span>
                    </div>
                    <p className="text-white font-medium text-lg">Warwick McIntosh</p>
                    <p className="text-gray-400">Founder & CEO</p>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[#3b82f6]/30 rounded-lg -z-10" />
            </div>
          </ScrollReveal>
        </div>

        {/* Differentiators */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiators.map((item, index) => (
              <div key={index} className="bg-[#0a0a0a] rounded-lg p-8 border border-gray-800">
                <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-[#3b82f6]" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Vision */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-gray-400 leading-relaxed">
              Help every Australian business leverage AI for real ROI. No fluff, no theoretical frameworks — just working AI systems that drive revenue, reduce costs, and create competitive advantage.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
