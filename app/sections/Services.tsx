"use client";

import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "../components/ScrollReveal";
import { Lightbulb, Wrench, GraduationCap, LineChart, ArrowRight } from "lucide-react";

const serviceCards = [
  {
    icon: Lightbulb,
    title: "AI Strategy & Roadmap",
    description:
      "We audit your business, identify high-impact AI opportunities, and create a clear implementation roadmap with ROI projections.",
  },
  {
    icon: Wrench,
    title: "AI Implementation & Integration",
    description:
      "We build and integrate AI systems into your existing workflows. No theoretical solutions — just working systems that deliver results.",
  },
  {
    icon: GraduationCap,
    title: "AI Training & Handover",
    description:
      "We train your team to use AI effectively, then hand over complete documentation and control. You own the capability.",
  },
  {
    icon: LineChart,
    title: "Ongoing AI Optimization",
    description:
      "We continuously monitor, optimize, and evolve your AI systems to maximize returns and adapt to your changing needs.",
  },
];

export function Services() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-[#10b981] text-sm font-medium tracking-wider uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Services That Deliver ROI
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            End-to-end AI implementation — from strategy to working systems.
          </p>
        </ScrollReveal>

        {/* Services Cards */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          staggerDelay={0.15}
        >
          {serviceCards.map((card, index) => (
            <StaggerItem key={index}>
              <div className="group h-full bg-[#0a0a0a] rounded-lg p-8 border border-gray-800 transition-all duration-300 hover:border-[#10b981]/50 hover:bg-[#0f0f0f]">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-center mb-6 group-hover:bg-[#10b981]/20 transition-colors duration-300">
                  <card.icon className="w-6 h-6 text-[#10b981]" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <ScrollReveal delay={0.4} className="text-center mt-12">
          <button
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center gap-2 text-[#10b981] hover:text-[#60a5fa] transition-colors duration-200 font-medium"
          >
            Discuss your AI needs
            <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
