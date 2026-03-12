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
    <section id="approach" className="py-24 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-blue-500 text-sm font-medium tracking-wider uppercase mb-4 block">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
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
              <div className="group h-full bg-[#0a0a0a] rounded-lg p-8 border border-gray-800 transition-all duration-300 hover:border-blue-500/50 hover:bg-[#0f0f0f]">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors duration-300">
                  <card.icon className="w-6 h-6 text-blue-500" />
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
      </div>
    </section>
  );
}
