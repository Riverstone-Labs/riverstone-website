"use client";

import { ScrollReveal } from "../components/ScrollReveal";
import { X, Check, AlertCircle, TrendingDown, FileQuestion } from "lucide-react";

const problemPoints = [
  {
    icon: FileQuestion,
    text: "Generic AI advice that never becomes real",
  },
  {
    icon: AlertCircle,
    text: "Implementations that fail to deliver",
  },
  {
    icon: TrendingDown,
    text: "No clear path from AI to revenue",
  },
];

export function Problem() {
  return (
    <section id="problem" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Stop Waiting for AI to Work
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Most businesses are stuck with AI that promises everything and delivers nothing.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* The Problem */}
          <ScrollReveal>
            <div className="h-full">
              <span className="text-gray-500 text-sm font-medium tracking-wider uppercase mb-4 block">
                The Problem
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-tight">
                Most AI projects fail before they start
              </h3>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                The industry is full of consultants who give you strategy documents but never build working systems. You&apos;re left with expensive advice and no actual AI running in your business.
              </p>
              
              <ul className="space-y-4">
                {problemPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                      <point.icon className="w-5 h-5 text-red-400" />
                    </div>
                    <span className="text-gray-300 text-lg">{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Our Solution */}
          <ScrollReveal delay={0.2}>
            <div className="h-full bg-[#111111] rounded-lg p-8 border border-gray-800">
              <span className="text-[#3b82f6] text-sm font-medium tracking-wider uppercase mb-4 block">
                Our Solution
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-tight">
                We build hands-on. We measure results.
              </h3>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                We don&apos;t just advise — we implement. We work inside your business, build working AI systems, and stay until you&apos;re seeing real ROI.
              </p>
              
              <div className="bg-[#0a0a0a] rounded-lg p-6 border border-gray-800">
                <p className="text-white font-medium text-lg leading-relaxed">
                  &ldquo;We build hands-on. We measure results. We hand over working systems.&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#3b82f6]/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#3b82f6]" />
                </div>
                <span className="text-gray-300">Strategy + Implementation + Handover</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
