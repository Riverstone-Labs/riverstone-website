"use client";

import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "../components/ScrollReveal";
import { Target, Layers, GraduationCap } from "lucide-react";

const approachCards = [
  {
    icon: Target,
    title: "We're selective",
    description:
      "We take on 4-6 engagements per year. This isn't scarcity marketing — it's how we ensure every client gets senior attention and meaningful outcomes.",
  },
  {
    icon: Layers,
    title: "We embed deeply",
    description:
      "We work inside your teams, attend your standups, understand your constraints. Real transformation happens when knowledge transfers through daily collaboration.",
  },
  {
    icon: GraduationCap,
    title: "You keep the capability",
    description:
      "Our goal is to make ourselves unnecessary. We document, train, and hand over — so your team owns the systems we build together.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="py-24 bg-[#242424]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-[#6b9b7a] text-sm font-medium tracking-wider uppercase mb-4 block">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f0] mb-6">
            Our Approach
          </h2>
        </ScrollReveal>

        {/* Approach Cards */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          staggerDelay={0.15}
        >
          {approachCards.map((card, index) => (
            <StaggerItem key={index}>
              <div className="group h-full bg-[#1a1a1a] rounded-lg p-8 border border-[#333333] transition-all duration-300 hover:border-[#4a7c59]/50 hover:bg-[#1e1e1e]">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-[#4a7c59]/10 border border-[#4a7c59]/30 flex items-center justify-center mb-6 group-hover:bg-[#4a7c59]/20 transition-colors duration-300">
                  <card.icon className="w-6 h-6 text-[#6b9b7a]" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#f5f5f0] mb-3">
                  {card.title}
                </h3>
                <p className="text-[#a0a0a0] leading-relaxed">
                  {card.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
