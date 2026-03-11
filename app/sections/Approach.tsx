"use client";

import { ScrollReveal, StaggerContainer, StaggerItem } from "../components/ScrollReveal";
import { Compass, Code, GraduationCap } from "lucide-react";

const phases = [
  {
    icon: Compass,
    title: "Strategy",
    subtitle: "Weeks 1-2",
    description: "We start by understanding your business objectives, data landscape, and technical constraints. No solution before problem definition.",
    deliverables: ["AI readiness assessment", "Use case prioritization", "Technical architecture", "ROI projections"],
  },
  {
    icon: Code,
    title: "Build",
    subtitle: "Weeks 3-10",
    description: "Rapid, iterative development with continuous validation. Production-grade code, not prototype-quality experiments.",
    deliverables: ["Production-ready system", "CI/CD pipeline", "Monitoring & observability", "Documentation"],
  },
  {
    icon: GraduationCap,
    title: "Handover",
    subtitle: "Weeks 11-12",
    description: "Knowledge transfer that sticks. Your team owns the solution, understands the system, and can evolve it independently.",
    deliverables: ["Team training sessions", "Code walkthroughs", "Runbook creation", "30-day support period"],
  },
];

export function Approach() {
  return (
    <section id="approach" className="py-24 bg-[#12121a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase mb-4 block">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Our Proven Process
          </h2>
          <p className="text-lg text-[#a1a1aa] max-w-2xl mx-auto">
            A battle-tested methodology that takes you from idea to production 
            in 12 weeks—without the usual consulting baggage.
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-px">
            <div className="h-full bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
          </div>

          {/* Phase Cards */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 relative" staggerDelay={0.2}>
            {phases.map((phase, index) => (
              <StaggerItem key={index}>
                <div className="group relative">
                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute top-20 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-4 h-4 rounded-full bg-[#00d4ff] glow-blue" />
                  </div>

                  {/* Card */}
                  <div className="pt-0 md:pt-32">
                    <div className="bg-[#0a0a0f] rounded-2xl p-8 border border-white/5 transition-all duration-300 hover:border-[#00d4ff]/30 hover:shadow-lg hover:shadow-[#00d4ff]/5">
                      {/* Icon */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d4ff]/20 to-[#f59e0b]/20 border border-[#00d4ff]/20 flex items-center justify-center mb-6">
                        <phase.icon className="w-8 h-8 text-[#00d4ff]" />
                      </div>

                      {/* Header */}
                      <div className="mb-4">
                        <span className="text-[#f59e0b] text-sm font-medium">
                          {phase.subtitle}
                        </span>
                        <h3 className="text-2xl font-bold text-white mt-1">
                          {phase.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-[#a1a1aa] leading-relaxed mb-6">
                        {phase.description}
                      </p>

                      {/* Deliverables */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3">
                          Key Deliverables:
                        </h4>
                        <ul className="space-y-2">
                          {phase.deliverables.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[#a1a1aa]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] mt-1.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
