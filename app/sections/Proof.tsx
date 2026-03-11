"use client";

import { ScrollReveal } from "../components/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

const caseStudies = [
  {
    client: "ASX-listed professional services firm",
    challenge: "200+ hours/month spent on manual proposal responses",
    approach: "Embedded AI system for RFP analysis and first-draft generation",
    outcome: "70% reduction in response time, 3x more bids submitted, system owned by internal team",
    verified: true,
  },
  {
    client: "Mid-market logistics company",
    challenge: "Customer service team drowning in repetitive inquiries",
    approach: "AI agent for tier-1 support with human escalation",
    outcome: "60% of inquiries handled autonomously, CSAT maintained, team focused on complex issues",
    verified: true,
  },
  {
    client: "Series B SaaS company",
    challenge: "Engineering team spending 30% of time on documentation",
    approach: "AI coding assistant integrated into development workflow",
    outcome: "Documentation time reduced by 50%, code review quality improved",
    verified: true,
  },
];

export function Proof() {
  return (
    <section id="proof" className="py-24 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-[#6b9b7a] text-sm font-medium tracking-wider uppercase mb-4 block">
            Proof of Value
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f0] mb-6">
            Results That Speak
          </h2>
          <p className="text-lg text-[#a0a0a0] max-w-2xl mx-auto">
            Real outcomes from real engagements. We measure success by the business results we deliver, not just the code we ship.
          </p>
        </ScrollReveal>

        {/* Case Studies */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card
                key={index}
                className="bg-[#242424] border-[#333333] h-full"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Client */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-[#f5f5f0] mb-2">
                      {study.client}
                    </h3>
                    {study.verified && (
                      <Badge
                        variant="secondary"
                        className="bg-[#4a7c59]/20 text-[#6b9b7a] border-none text-xs"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  {/* Challenge */}
                  <div className="mb-4">
                    <span className="text-[#6b6b6b] text-xs font-medium uppercase tracking-wider">
                      Challenge
                    </span>
                    <p className="text-[#a0a0a0] text-sm mt-1">
                      {study.challenge}
                    </p>
                  </div>

                  {/* Approach */}
                  <div className="mb-4">
                    <span className="text-[#6b6b6b] text-xs font-medium uppercase tracking-wider">
                      Approach
                    </span>
                    <p className="text-[#a0a0a0] text-sm mt-1">
                      {study.approach}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="mt-auto pt-4 border-t border-[#333333]">
                    <span className="text-[#6b9b7a] text-xs font-medium uppercase tracking-wider">
                      Outcome
                    </span>
                    <p className="text-[#f5f5f0] text-sm mt-1 font-medium">
                      {study.outcome}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollReveal>

        {/* Verification Note */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 text-center">
            <p className="text-sm text-[#6b6b6b]">
              All case studies represent verified engagements. Client references available upon request.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
