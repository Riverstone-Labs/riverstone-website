"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "../components/ScrollReveal";

const caseStudies = [
  {
    client: "Manufacturing Corp",
    challenge: "Manual quality control causing delays and defects",
    solution: "AI-powered computer vision inspection system",
    result: "50% efficiency gain",
    metric: "50%",
    metricLabel: "Efficiency Gain",
  },
  {
    client: "Financial Services Inc",
    challenge: "Slow customer onboarding and document processing",
    solution: "Automated document analysis and verification",
    result: "2x ROI in 6 months",
    metric: "2x",
    metricLabel: "ROI Achieved",
  },
  {
    client: "Retail Chain",
    challenge: "Inaccurate demand forecasting leading to stock issues",
    solution: "Predictive analytics for inventory management",
    result: "30% reduction in waste",
    metric: "30%",
    metricLabel: "Waste Reduced",
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 lg:py-32 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Our Work
            </h2>
            <p className="text-lg text-[#a1a1aa] max-w-2xl mx-auto">
              Real results for real businesses
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-[#0a0a0a] p-8 rounded-2xl border border-[#27272a] hover:border-[#3b82f6]/50 transition-all h-full"
              >
                <div className="mb-6">
                  <span className="text-[#3b82f6] text-sm font-semibold uppercase tracking-wider">
                    Case Study
                  </span>
                  <h3 className="text-xl font-semibold text-white mt-2">
                    {study.client}
                  </h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-[#71717a] text-sm mb-1">Challenge</p>
                    <p className="text-[#a1a1aa] text-sm">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-[#71717a] text-sm mb-1">Solution</p>
                    <p className="text-[#a1a1aa] text-sm">{study.solution}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#27272a]">
                  <div className="text-3xl font-bold text-[#3b82f6] mb-1">
                    {study.metric}
                  </div>
                  <div className="text-[#a1a1aa] text-sm mb-4">{study.metricLabel}</div>
                  <a
                    href="#case-studies"
                    className="inline-flex items-center text-[#3b82f6] hover:text-[#60a5fa] text-sm font-medium transition-colors"
                  >
                    Read Case Study
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
