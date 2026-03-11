"use client";

import { ScrollReveal } from "../components/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Rocket, Shield } from "lucide-react";
import Image from "next/image";

const capabilities = [
  "AI agent design and implementation",
  "Large language model integration and optimisation",
  "Intelligent workflow automation",
  "AI evaluation and safety frameworks",
  "Custom AI tooling and infrastructure",
];

const values = [
  {
    icon: Rocket,
    title: "Production-First",
    description:
      "We build systems designed for real-world operation from day one.",
  },
  {
    icon: Users,
    title: "Knowledge Transfer",
    description:
      "Your team owns the solution. We ensure they can maintain and evolve it independently.",
  },
  {
    icon: Shield,
    title: "Business Value",
    description: "Technology serves business goals—not the other way around.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 bg-[#0a0a0f] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about-collaboration.webp"
          alt="Abstract human-AI collaboration visualization"
          fill
          quality={85}
          loading="lazy"
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay - darker at top, fades to solid at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/90 via-[#0a0a0f]/85 to-[#0a0a0f]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase mb-4 block">
            About Riverstone Labs
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Enterprise AI Systems That Work
          </h2>
          <p className="text-lg text-[#a1a1aa] max-w-3xl mx-auto">
            We are a specialist AI consultancy focused on one thing: getting AI
            systems into production and delivering measurable business value.
          </p>
        </ScrollReveal>

        {/* Our Approach */}
        <ScrollReveal className="mb-16">
          <div className="bg-[#12121a] rounded-2xl p-8 md:p-12 border border-white/5">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Our Approach
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#00d4ff] font-bold">1</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Research & Strategy
                </h4>
                <p className="text-[#a1a1aa] text-sm">
                  We evaluate your needs against the rapidly evolving AI
                  landscape
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#00d4ff] font-bold">2</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Rapid Prototyping
                </h4>
                <p className="text-[#a1a1aa] text-sm">
                  Validate concepts quickly with working prototypes
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#00d4ff] font-bold">3</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Production Engineering
                </h4>
                <p className="text-[#a1a1aa] text-sm">
                  Build robust, scalable systems designed for real-world
                  operation
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Capabilities */}
          <ScrollReveal>
            <h3 className="text-2xl font-bold text-white mb-6">Capabilities</h3>
            <div className="space-y-4">
              {capabilities.map((capability, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#00d4ff] mt-0.5 shrink-0" />
                  <span className="text-[#a1a1aa]">{capability}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {[
                "Machine Learning",
                "LLMs",
                "System Design",
                "Production AI",
              ].map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-[#1a1a24] text-[#a1a1aa] border border-white/10 hover:border-[#00d4ff]/30 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </ScrollReveal>

          {/* Values */}
          <ScrollReveal delay={0.2}>
            <h3 className="text-2xl font-bold text-white mb-6">How We Work</h3>
            <div className="space-y-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center shrink-0">
                    <value.icon className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {value.title}
                    </h4>
                    <p className="text-[#a1a1aa] text-sm">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Team Statement */}
            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="text-[#a1a1aa] leading-relaxed">
                Our specialists combine deep technical expertise with practical
                business experience. We have built AI systems across finance,
                healthcare, technology, and government sectors.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
