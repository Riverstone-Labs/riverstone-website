"use client";

import { ScrollReveal } from "../components/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2, Factory, Truck } from "lucide-react";

const caseStudies = [
  {
    industry: "Professional Services",
    icon: Building2,
    metric: "40% reduction in processing time",
    description: "Implemented AI document processing system that automated client onboarding and report generation workflows.",
  },
  {
    industry: "Manufacturing",
    icon: Factory,
    metric: "$2.4M annual cost savings",
    description: "Built predictive maintenance AI that reduced equipment downtime by 60% and optimized supply chain operations.",
  },
  {
    industry: "Logistics",
    icon: Truck,
    metric: "3x improvement in routing efficiency",
    description: "Developed AI-powered route optimization and demand forecasting system for nationwide delivery network.",
  },
];

export function SocialProof() {
  return (
    <section id="social-proof" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-[#3b82f6] text-sm font-medium tracking-wider uppercase mb-4 block">
            Trusted by Forward-Thinking Businesses
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Results That Speak
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Real outcomes from real implementations. We measure success by the business results we deliver.
          </p>
        </ScrollReveal>

        {/* Case Studies */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card
                key={index}
                className="bg-[#111111] border-gray-800 h-full group hover:border-[#3b82f6]/50 transition-all duration-300"
              >
                <CardContent className="p-8 flex flex-col h-full">
                  {/* Icon and Industry */}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center mb-4">
                      <study.icon className="w-6 h-6 text-[#3b82f6]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {study.industry}
                    </h3>
                  </div>

                  {/* Metric */}
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-[#3b82f6]">
                      {study.metric}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                    {study.description}
                  </p>

                  {/* Link */}
                  <div className="pt-4 border-t border-gray-800">
                    <button className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group-hover:text-[#3b82f6]">
                      Read Case Study
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollReveal>

        {/* Note */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              All case studies represent verified client engagements. Full references available upon request.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
