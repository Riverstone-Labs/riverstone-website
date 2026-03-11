"use client";

import { ScrollReveal, StaggerContainer, StaggerItem } from "../components/ScrollReveal";
import { Target, AlertTriangle, Users } from "lucide-react";

const problems = [
  {
    icon: Target,
    title: "The Strategy Gap",
    description: "AI without business alignment. Projects that solve technical problems instead of business problems, leading to expensive solutions nobody asked for.",
    stat: "67%",
    statLabel: "of AI projects fail to align with business goals",
  },
  {
    icon: AlertTriangle,
    title: "The Implementation Trap",
    description: "POCs that never scale. Impressive demos that crumble under real-world load, data drift, and operational complexity.",
    stat: "87%",
    statLabel: "of ML models never reach production",
  },
  {
    icon: Users,
    title: "The Dependency Problem",
    description: "Consultants who never leave. External teams that build black-box systems, leaving you dependent on their continued involvement.",
    stat: "$500K",
    statLabel: "average annual vendor lock-in cost",
  },
];

export function Problem() {
  return (
    <section id="problem" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase mb-4 block">
            The Challenge
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Why Most AI Projects Fail
          </h2>
          <p className="text-lg text-[#a1a1aa] max-w-2xl mx-auto">
            After working with dozens of enterprises, we have seen the same patterns repeat. 
            Here is why AI initiatives struggle—and how we fix them.
          </p>
        </ScrollReveal>

        {/* Problem Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
          {problems.map((problem, index) => (
            <StaggerItem key={index}>
              <div className="group relative h-full">
                {/* Card with gradient border on hover */}
                <div className="relative h-full bg-[#12121a] rounded-2xl p-8 border border-white/5 transition-all duration-300 hover:border-[#00d4ff]/30 hover:bg-[#1a1a24]">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00d4ff]/5 to-[#f59e0b]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-[#1a1a24] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#00d4ff]/30 transition-colors duration-300">
                      <problem.icon className="w-7 h-7 text-[#00d4ff]" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3">
                      {problem.title}
                    </h3>
                    <p className="text-[#a1a1aa] leading-relaxed mb-6">
                      {problem.description}
                    </p>

                    {/* Stat */}
                    <div className="pt-6 border-t border-white/5">
                      <div className="text-3xl font-bold gradient-text mb-1">
                        {problem.stat}
                      </div>
                      <div className="text-sm text-[#71717a]">
                        {problem.statLabel}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
