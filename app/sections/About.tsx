"use client";

import { ScrollReveal } from "../components/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

const credentials = [
  "Former Principal Engineer at Google AI",
  "Led ML teams at 3 Fortune 500 companies",
  "Published researcher in NLP and RL",
  "Speaker at NeurIPS, ICML, and AWS re:Invent",
  "Advisory board member for 2 AI startups",
];

export function About() {
  return (
    <section id="about" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <ScrollReveal>
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#00d4ff]/20 to-[#f59e0b]/20 rounded-3xl blur-2xl opacity-30" />
              
              {/* Image placeholder */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#12121a] border border-white/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00d4ff]/20 to-[#f59e0b]/20 border-2 border-[#00d4ff]/30 flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl font-bold text-[#00d4ff]">W</span>
                    </div>
                    <p className="text-[#71717a] text-sm">Photo placeholder</p>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-20 h-20 border border-[#00d4ff]/20 rounded-lg" />
                <div className="absolute bottom-4 right-4 w-16 h-16 border border-[#f59e0b]/20 rounded-lg" />
              </div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal delay={0.2}>
            <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase mb-4 block">
              About
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Meet Warwick
            </h2>
            
            <div className="space-y-4 text-[#a1a1aa] leading-relaxed mb-8">
              <p>
                I started Riverstone Labs after watching too many AI initiatives fail—not 
                because the technology was not ready, but because the approach was wrong.
              </p>
              <p>
                For 15 years, I have been in the trenches: building production ML systems, 
                leading engineering teams, and navigating the gap between cutting-edge research 
                and real-world business value.
              </p>
              <p>
                I have seen what works and what does not. Riverstone exists to do it right: 
                business-first strategy, production-quality engineering, and genuine knowledge 
                transfer so your team can thrive long after we are gone.
              </p>
            </div>

            {/* Credentials */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Credentials
              </h3>
              {credentials.map((credential, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#00d4ff] mt-0.5 shrink-0" />
                  <span className="text-[#a1a1aa]">{credential}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {["Machine Learning", "NLP", "System Design", "Team Building"].map((tag) => (
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
        </div>
      </div>
    </section>
  );
}
